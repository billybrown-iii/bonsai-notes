import Page from './Page'
import FolderRef from './FolderRef'
import PageRef from './PageRef'
import { v4 as uuid } from 'uuid'
import localforage from 'localforage'

/**
 * Describes the notes' tree structure and holds functionality for making changes.
 */
class Folder {
  constructor(title: string, parentPath: string[]) {
    this.title = title
    this.path = [...parentPath, title]
  }

  title: string
  path: string[]

  folders: Folder[] = []
  pages: Page[] = []

  createChildFolder = (title: string) => {
    title = title.trim()
    if (this.folders.find((folder) => folder.title === title)) {
      return 'duplicate'
    }

    // autoname if no name is provided
    if (title.length === 0) {
      let latestFolder = 1
      for (let i = 0; i < this.folders.length; i++) {
        if (this.folders[i].title === 'Folder ' + latestFolder) {
          latestFolder++
          i = -1
        }
      }
      title = 'Folder ' + latestFolder
    }

    this.folders.push(new Folder(title, this.path))
    return 'success'
  }

  renameChildFolder = (prev: string, next: string) => {
    next = next.trim()
    if (next.length === 0) return 'empty'
    if (prev === next) return 'success'

    const folderToEdit = this.folders.find((folder) => folder.title === prev)
    if (!folderToEdit) throw new Error('Folder not found')

    if (this.folders.some((folder) => folder.title === next)) return 'duplicate'

    folderToEdit.title = next
    const newPath = folderToEdit.path.slice(0, this.path.length).concat(next)
    updatePaths(folderToEdit, newPath)
    return 'success'
  }

  deleteChildFolder = (title: string) => {
    const folderToDelete = this.folders.find((folder) => folder.title === title)
    if (!folderToDelete) throw new Error(`Folder "${title}" not found`)
    deleteChildPages(folderToDelete)
    this.folders = this.folders.filter((folder) => folder.title !== title)
  }

  createPage = (title: string) => {
    title = title.trim()
    // check for identical page titles in same folder
    if (this.pages.some((page) => page.title === title)) {
      return 'duplicate'
    }

    // autoname pages if no name is provided
    if (title.length === 0) {
      let latestPage = 1
      for (let i = 0; i < this.pages.length; i++) {
        if (this.pages[i].title === 'Page ' + latestPage) {
          latestPage++
          i = -1
        }
      }
      title = 'Page ' + latestPage
    }

    const pageID = uuid()
    this.pages.push(new Page(title, this.path, pageID))
    return localforage.setItem(pageID, '')
  }

  deletePage = (title: string) => {
    const pageToDelete = this.pages.find((page) => page.title === title)
    if (!pageToDelete) throw new Error(`Page "${title}" not found`)
    localforage.removeItem(pageToDelete.id)
    this.pages = this.pages.filter((page) => page.title !== title)
  }

  changePageTitle = (prev: string, next: string) => {
    next = next.trim()
    if (prev === next) return 'same'
    if (next.length === 0) return 'empty'
    if (this.pages.some((page) => page.title === next)) return 'duplicate'

    const pageToEdit = this.pages.find((page) => page.title === prev)
    pageToEdit!.title = next
    return 'success'
  }

  updatePageContent = (title: string | null, content: string) => {
    if (!title) return
    const pageToEdit = this.pages.find((page) => page.title === title)
    if (!pageToEdit) throw new Error(`Page "${title}" not found`)
    return localforage.setItem(pageToEdit.id, content)
  }

  fetchPageContent = (title: string) => {
    const pageToFetch = this.pages.find((page) => page.title === title)
    if (!pageToFetch) throw new Error(`fetchPageContent failed: page "${title}" not found`)
    return localforage.getItem(pageToFetch.id)
  }

  /**
   * Takes in a path, returns the child object that the path refers to.
   */
  navObj = (path: string[]) => {
    // only work on home level
    if (this.path.length > 1) throw new Error('used at invalid depth')

    let copy = path.slice(1)
    let next: Folder | undefined = this
    while (copy.length > 0) {
      next = next?.folders.find((folder) => folder.title === copy[0])
      if (!next) throw new Error('Folder not found')
      copy.shift()
    }
    return next || this
  }

  findPage = (title: string | null) => {
    return this.pages.find((page) => page.title === title)
  }

  /**
   * Generates folderRefs for UI display.
   */
  folderRefGen = () => {
    return this.folders.slice().map((item) => new FolderRef(item.title, this.path))
  }

  /**
   * Generates pageRefs for UI display.
   */
  pageRefGen = () => {
    return this.pages.slice().map((item) => new PageRef(item.title, item.path))
  }
}

type JsonFolder = {
  title: string
  path: string[]
  folders: JsonFolder[]
  pages: Page[]
}

const createHomeFolder = (savedNotes: string | null) => {
  if (!savedNotes) {
    // initial app state
    const folder = new Folder('Home', [])
    folder.createPage('welcome')
    folder.updatePageContent('welcome', 'some content')
    return folder
  } else {
    // uses savedNotes to populate content
    const folder = new Folder('Home', [])
    const obj = JSON.parse(savedNotes)
    populate(folder, obj)
    return folder
  }
}

/** Takes in the home folder (or child folders on recursive calls) for the first argument, and the parsed JSON as the 2nd. */
const populate = (folder: Folder, savedNotes: JsonFolder) => {
  // populate the pages
  for (const page of savedNotes.pages) {
    const append = { ...page }
    folder.pages.push(append)
  }

  // populate the folders
  for (const childFolder of savedNotes.folders) {
    const append = new Folder(childFolder.title, folder.path)
    populate(append, childFolder)
    folder.folders.push(append)
  }
}

const updatePaths = (folder: Folder, newPath: string[]) => {
  // update own path
  folder.path = newPath.concat(folder.path.slice(newPath.length))
  // update pages
  folder.pages.forEach((page) => (page.path = newPath.concat(page.path.slice(newPath.length))))

  // update folders
  folder.folders.forEach((childFolder) => updatePaths(childFolder, newPath))
}

const deleteChildPages = (folder: Folder) => {
  // delete all immediate pages
  for (let page of folder.pages) {
    console.log(page.id)
    localforage.removeItem(page.id)
  }

  // dive into child folders and do the same
  for (let childFolder of folder.folders) {
    deleteChildPages(childFolder)
  }
}

export { Folder, createHomeFolder }
