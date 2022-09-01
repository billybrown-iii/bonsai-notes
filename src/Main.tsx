import { Dispatch, SetStateAction, useState } from "react"
import { Folder } from "./Classes/Folder"
import Editor from "./UI/Editor"
import MobileView from "./UI/MobileView"
import Sidebar from "./UI/Sidebar"

// TODO create mobile notif view

type Props = {
  parent: Folder
  path: string[]
  setPath: Dispatch<SetStateAction<string[]>>
  saveNoteTree: () => void
}

// in order to avoid redeclaring parent every time there's a change to pages, separate Main from App component
const Main = ({ parent, path, setPath, saveNoteTree }: Props) => {
  const [pageRefs, setPageRefs] = useState(parent.pageRefGen())
  const [selectedPage, setSelectedPage] = useState<string | null>(null)

  const deletePage = (title: string) => {
    parent.deletePage(title)
    setPageRefs(parent.pageRefGen())
    if (title === selectedPage) setSelectedPage(null)
    saveNoteTree()
  }

  return (
    <div className="h-screen bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      <div
        id="main"
        className="relative flex flex-wrap h-full w-full max-w-screen-xl min-w-[768px] m-auto bg-neutral-100 dark:bg-gray-800 text-zinc-900 dark:text-zinc-50"
      >
        <Sidebar
          path={path}
          setPath={setPath}
          parent={parent}
          pageRefs={pageRefs}
          setPageRefs={setPageRefs}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          deletePage={deletePage}
          saveNoteTree={saveNoteTree}
        />
        <Editor
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          parent={parent}
          setPageRefs={setPageRefs}
          saveNoteTree={saveNoteTree}
        />
        <MobileView />
      </div>
    </div>
  )
}

export default Main
