import { useState, useEffect, useRef, Dispatch, SetStateAction, ChangeEventHandler } from "react"
import { Folder } from "../Classes/Folder"
import initContent from "../Misc/initContent"
import TitleBar from "./TitleBar"
import PageRef from "../Classes/PageRef"
import Nav from "./Nav"
import { Editor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"

let initialValue: string | undefined = ""

type Props = {
  selectedPage: string | null
  setSelectedPage: Dispatch<SetStateAction<string | null>>
  parent: Folder
  setPageRefs: Dispatch<SetStateAction<PageRef[]>>
  saveNoteTree: () => void
  homeFolder: Folder
}

export default function PrimaryEditor({
  selectedPage,
  setSelectedPage,
  parent,
  setPageRefs,
  saveNoteTree,
  homeFolder,
}: Props) {
  const editorRef = useRef<TinyMCEEditor>()
  const currentPage = parent.findPage(selectedPage)
  const [pageTitle, setPageTitle] = useState("")

  const [key, setKey] = useState(0)
  const element = document.getElementById("html")
  const isDark = element!.classList.contains("dark")
  const refreshEditor = () => {
    initialValue = editorRef.current?.getContent()
    setKey((prev) => prev + 1)
  }

  // don't show editor until content is loaded
  const [showEditor, setShowEditor] = useState(false)

  // if user selects a different page, switch to that page's content
  useEffect(() => {
    if (currentPage === undefined) {
      setShowEditor(false)
      editorRef.current?.setContent("")
    } else {
      setPageTitle(currentPage.title)
      // TODO fix any
      // do so by changing to async/await

      // if editor exists, update its content
      // else, update initialContent
      parent.fetchPageContent(currentPage.title).then((content: any) => {
        if (content === null) throw new Error("Editor.tsx effect failed: page content not found")
        if (editorRef.current) {
          editorRef.current.setContent(content)
          editorRef.current.undoManager.clear()
          // auto-focus on empty page
          if (content.length === 0) editorRef.current.focus()
          setShowEditor(true)
        } else {
          initialValue = content
          setShowEditor(true)
        }
      })
    }
  }, [currentPage, parent])

  // autofocus on welcome page for new users, or first page if exists
  useEffect(() => {
    if (localStorage.getItem("homeFolder") === null) {
      initialValue = initContent
      setSelectedPage("Welcome!")
      setPageTitle("Welcome!")
      setShowEditor(true)
    } else {
      if (homeFolder.pages.length > 0) {
        const title: string = homeFolder.pages[0].title
        homeFolder.fetchPageContent(title).then((result: any) => {
          editorRef.current ? editorRef.current.setContent(result) : (initialValue = result)
          setSelectedPage(title)
          setPageTitle(title)
          setShowEditor(true)
        })
      }
    }
  }, [setSelectedPage, homeFolder])

  /** Handles user changing the title text for a page. */
  const titleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTitle = e.target.value
    setPageTitle(newTitle)
  }

  /** When user blurs or hits enter, save updated page title. */
  const saveTitleChange = () => {
    if (!selectedPage) return

    const result = parent.changePageTitle(selectedPage, pageTitle)

    switch (result) {
      case "same":
        return
      case "empty": {
        setPageTitle(selectedPage)
        return alert("A page title is required.")
      }
      case "duplicate": {
        setPageTitle(selectedPage)
        return alert("A page with this title already exists.  Please use a different name.")
      }
    }

    setPageRefs(parent.pageRefGen())
    setSelectedPage(pageTitle)
    saveNoteTree()
  }

  const save = () => {
    if (selectedPage && editorRef.current) {
      parent.updatePageContent(selectedPage, editorRef.current.getContent())
    }
  }

  return (
    <>
      <div
        className={(showEditor ? "" : "hidden") + " w-2/3 lg:w-[69%] h-11/12 max-h-[90vh]"}
        id="editor"
        key={key}
      >
        <TitleBar
          pageTitle={pageTitle}
          titleChange={titleChange}
          saveTitleChange={saveTitleChange}
        />
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          init={{
            width: "100%",
            height: "100%",
            skin: isDark ? "oxide-dark" : "oxide",
            content_css: isDark ? "dark" : "default",
            plugins: "fullscreen lists",
            toolbar_sticky: true,
            menubar: "false",
            statusbar: false,
            toolbar:
              "bold italic underline numlist bullist strikethrough hr | fontsize | alignleft aligncenter alignright | fullscreen",
            forced_root_block: "div",
          }}
          initialValue={initialValue}
          onInit={(evt, editor) => (editorRef.current = editor)}
          onEditorChange={save}
        />
        {/* <button
          onClick={() => {
            console.log(editorRef?.current?.getContent())
          }}
        >
          test
        </button> */}
      </div>

      <Nav refreshEditor={refreshEditor} />
    </>
  )
}
