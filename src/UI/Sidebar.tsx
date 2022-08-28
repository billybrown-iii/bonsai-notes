import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import FolderRef from '../Classes/FolderRef'
import PageRef from '../Classes/PageRef'
import FolderList from './FolderList'
import PageList from './PageList'
import feather from 'feather-icons'
import { Folder } from '../Classes/Folder'
import ResponsiveButton from './ResponsiveButton'
import ParentFolder from './ParentFolder'

// TODO handle errors in axios calls

const newFolderIcon = feather.icons['folder-plus'].toSvg({
  'stroke-width': 2,
  width: '24px',
})
const newPageIcon = feather.icons['edit'].toSvg({
  'stroke-width': 2,
  width: '24px',
})

type Props = {
  path: string[]
  setPath: Dispatch<SetStateAction<string[]>>
  parent: Folder
  pageRefs: PageRef[]
  setPageRefs: Dispatch<SetStateAction<PageRef[]>>
  selectedPage: string | null
  setSelectedPage: Dispatch<SetStateAction<string | null>>
  deletePage: (title: string) => void
  saveNoteTree: () => void
}

export default function Sidebar({
  path,
  setPath,
  parent,
  pageRefs,
  setPageRefs,
  selectedPage,
  setSelectedPage,
  deletePage,
  saveNoteTree,
}: Props) {
  const [folderRefs, setFolderRefs] = useState(parent.folderRefGen())

  // When the parent changes, update displayed folders/pages.
  // State setter functions are guaranteed to have a stable identity per the docs.
  // Therefore, it's fine to include as a dependency.
  useEffect(() => {
    setFolderRefs(parent.folderRefGen())
    setPageRefs(parent.pageRefGen())
  }, [parent, setPageRefs])

  /** Adds a temporary placeholder folderRef, pending naming and confirmation */
  const newFolder = () => {
    const newFolderRef = new FolderRef('New Folder', path, 'new')
    setFolderRefs([...folderRefs, newFolderRef])
    saveNoteTree()
  }

  /*** Adds new folderRef to UI and new folder to parent object */
  const addFolder = (title: string) => {
    const result = parent.createChildFolder(title)
    setFolderRefs(parent.folderRefGen())

    if (result === 'duplicate') {
      alert('A folder with this name already exists.  Please use a different name.')
    }
    saveNoteTree()
  }

  /**
   * Takes in name of folder to edit
   * refreshes folderRefs with the affected one in editable state
   */
  const renameFolder = (title: string) => {
    setFolderRefs((prev) =>
      prev.map((ref) => {
        if (ref.title === title) {
          ref.code = 'edit'
        }
        return ref
      })
    )
  }

  const saveFolderRename = (prevName: string, newName: string) => {
    const result = parent.renameChildFolder(prevName, newName)
    setFolderRefs(parent.folderRefGen())
    switch (result) {
      case 'success':
        return saveNoteTree()
      case 'empty':
        return alert('A name is required.')
      case 'duplicate':
        return alert("There's already a folder with this title.  Please use a different name.")
    }
  }

  const deleteFolder = (title: string) => {
    parent.deleteChildFolder(title)
    setFolderRefs(parent.folderRefGen())
    saveNoteTree()
  }

  /** Adds a temporary placeholder pageRef. */
  const newPage = () => {
    const newPageRef = new PageRef('New Page', null)
    setPageRefs([...pageRefs, newPageRef])
  }

  /*** Adds new pageRef to UI and new page to parent object.*/
  const addPage = (title: string) => {
    const result = parent.createPage(title)
    setPageRefs(parent.pageRefGen())

    if (result === 'duplicate') {
      return alert('A page with this title already exists.  Please use a different name.')
    }

    saveNoteTree()

    result.then(() => {
      setSelectedPage(parent.pages[parent.pages.length - 1].title)
    })
  }

  return (
    <div
      id="sidebar"
      className="h-full w-1/3 lg:w-[31%] overflow-auto border-r-2 border-zinc-300 dark:border-slate-600 select-none"
    >
      <div className="flex">
        <ParentFolder
          setSelectedPage={setSelectedPage}
          path={path}
          setPath={setPath}
          parent={parent}
        />
        <div className="ml-auto mt-1 mr-3 py-1">
          <ResponsiveButton icon={newFolderIcon} func={newFolder} text="New Folder" />
        </div>
      </div>
      <div
        className={
          'relative z-10 flex justify-end w-full -mb-12 pr-3 pt-4 ' +
          (pageRefs.length > 0 ? 'hidden' : 'visible')
        }
      >
        <ResponsiveButton icon={newPageIcon} func={newPage} text="New Page" />
      </div>

      <div id="sidebar-list" className="pb-10">
        <FolderList
          setPath={setPath}
          setSelectedPage={setSelectedPage}
          folderRefs={folderRefs}
          pageRefs={pageRefs}
          addFolder={addFolder}
          deleteFolder={deleteFolder}
          renameFolder={renameFolder}
          saveFolderRename={saveFolderRename}
        />

        <div className={'flex ml-8 mr-auto ' + (pageRefs.length > 0 ? 'visible' : 'hidden')}>
          <div
            id="connecting-line"
            className={
              'relative z-0 -mb-40 bottom-32 right-3 w-3.5 h-40 border-l-2 border-b-2 rounded-bl-xl border-neutral-400 dark:border-gray-500 '
            }
          ></div>
          <div className="relative top-4 text-lg -ml-1 text-gray-900 dark:text-gray-300">Pages</div>
          <div className="relative top-1 ml-auto mr-3">
            <ResponsiveButton icon={newPageIcon} func={newPage} text="New Page" />
          </div>
        </div>
        <hr
          className={
            'w-11/12 m-auto mt-3 mb-4 border-t border-gray-600 ' +
            (pageRefs.length > 0 ? 'visible' : 'hidden')
          }
        />
        <div className="flex justify-around">
          <div className="w-11/12 xl:w-4/5 ml-5">
            <PageList
              pageRefs={pageRefs}
              addPage={addPage}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              deletePage={deletePage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
