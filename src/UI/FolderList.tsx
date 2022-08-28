import { MenuItem } from '@szhsin/react-menu'
import feather from 'feather-icons'
import { Dispatch, SetStateAction } from 'react'
import FolderRef from '../Classes/FolderRef'
import PageRef from '../Classes/PageRef'
import SettingsButton from './SettingsButton'

const icon = feather.icons['folder'].toSvg({
  'stroke-width': 1,
  width: '20px',
})

type Props = {
  setPath: Dispatch<SetStateAction<string[]>>
  setSelectedPage: Dispatch<SetStateAction<string | null>>
  folderRefs: FolderRef[]
  pageRefs: PageRef[]
  addFolder: (title: string) => void
  deleteFolder: (title: string) => void
  renameFolder: (title: string) => void
  saveFolderRename: (prevName: string, newName: string) => void
}

/** List of folderRefs to be displayed in UI */
export default function FolderList({
  setPath,
  setSelectedPage,
  folderRefs,
  pageRefs,
  addFolder,
  deleteFolder,
  renameFolder,
  saveFolderRename,
}: Props) {
  const folderStyles = `group relative z-10 
     flex items-center 
     w-1/2 xl:w-5/12 ml-4 my-1.5 p-2 pl-3 
     text-sm overflow-hidden
     rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-gray-700 dark:hover:bg-gray-600`

  const folders = folderRefs.map((item, index) => {
    if (item.code === 'new') {
      return (
        <div className="group flex items-center w-full" key={index}>
          <div
            id="line"
            className={
              'relative z-0 -my-8 bottom-10 left-5 right-3 w-4 h-20 border-l-2 border-b-2 border-neutral-400 dark:border-gray-500' +
              (pageRefs.length === 0 && index === folderRefs.length - 1 ? ' rounded-bl-lg' : '')
            }
          />
          <div className={folderStyles}>
            <input
              className="w-5/6 m-auto border-2 border-zinc-500 rounded-xl dark:bg-zinc-600 py-2 px-5"
              type="text"
              maxLength={30}
              placeholder="New Folder"
              autoFocus
              onBlur={(e) => {
                addFolder(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addFolder(e.target.value)
              }}
            />
          </div>
        </div>
      )
    } else if (item.code === 'edit') {
      return (
        <div className="group flex items-center w-full" key={index}>
          <div
            id="line"
            className={
              'relative z-0 -my-8 bottom-10 left-5 right-3 w-4 h-20 border-l-2 border-b-2 border-neutral-400 dark:border-gray-500' +
              (pageRefs.length === 0 && index === folderRefs.length - 1 ? ' rounded-bl-lg' : '')
            }
          />
          <div className={folderStyles}>
            <input
              className="w-full m-auto border-2 border-zinc-500 rounded-xl dark:bg-zinc-600 py-2 px-5"
              type="text"
              maxLength={30}
              placeholder="New Folder"
              defaultValue={item.title}
              autoFocus
              onBlur={(e) => {
                saveFolderRename(item.title, e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') saveFolderRename(item.title, e.target.value)
              }}
            />
          </div>
        </div>
      )
    } else
      return (
        <div className="group flex items-center w-full" key={index}>
          <div
            id="line"
            className={
              'relative z-0 -my-8 bottom-10 left-5 right-3 w-4 h-20 border-l-2 border-b-2 border-neutral-400 dark:border-gray-500' +
              (pageRefs.length === 0 && index === folderRefs.length - 1 ? ' rounded-bl-lg' : '')
            }
          />
          <div
            onClick={() => {
              setSelectedPage(null)
              setPath(item.path)
            }}
            className={folderStyles}
            id={'folderref-' + index}
          >
            <div className="mr-2 -mt-0.5" dangerouslySetInnerHTML={{ __html: icon }} />
            <div className="overflow-hidden">{item.title}</div>
          </div>

          <div className="relative z-10 w-fit">
            <SettingsButton>
              <MenuItem onClick={() => deleteFolder(item.title)}>Delete</MenuItem>
              <MenuItem onClick={() => renameFolder(item.title)}>Rename</MenuItem>
            </SettingsButton>
          </div>
        </div>
      )
  })

  return <div className="pt-2 pb-3">{folders}</div>
}
