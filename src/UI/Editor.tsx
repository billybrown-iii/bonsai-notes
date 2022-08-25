import { useState, useEffect, useRef, Dispatch, SetStateAction, ChangeEventHandler } from 'react'
import TitleBar from './TitleBar'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Folder } from '../Classes/Folder'
import PageRef from '../Classes/PageRef'
import Nav from './Nav'

// an initial value is needed for the purpose of the dark theme switching
let initialValue: string | undefined = ''

type Props = {
  selectedPage: string | null
  setSelectedPage: Dispatch<SetStateAction<string | null>>
  parent: Folder
  setPageRefs: Dispatch<SetStateAction<PageRef[]>>
  saveNoteTree: () => void
}

export default function PrimaryEditor({
  selectedPage,
  setSelectedPage,
  parent,
  setPageRefs,
  saveNoteTree,
}: Props) {
  const editorRef = useRef<TinyMCEEditor>()
  const currentPage = parent.findPage(selectedPage)
  const [pageTitle, setPageTitle] = useState('')

  const [key, setKey] = useState(0)
  const element = document.getElementById('html')
  const isDark = element!.classList.contains('dark')
  const refreshEditor = () => {
    initialValue = editorRef.current?.getContent()
    setKey((prev) => prev + 1)
  }

  // don't show editor until content is loaded
  const [showEditor, setShowEditor] = useState(false)
  // if user selects a different page, switch to that page's content
  useEffect(() => {
    if (editorRef.current && currentPage === undefined) {
      setShowEditor(false)
      editorRef.current.setContent('')
    }
    if (editorRef.current && currentPage) {
      setPageTitle(currentPage.title)
      // TODO fix any
      // do so by changing to async/await
      parent.fetchPageContent(currentPage.title).then((content: any) => {
        if (content !== null && editorRef.current) {
          editorRef.current.setContent(content)
          // auto-focus on empty page
          if (content.length === 0) editorRef.current.focus()
          setShowEditor(true)
        } else {
          throw new Error(`effect failed: Page "${currentPage.title}" not found`)
        }
      })
    } else {
    }
  }, [currentPage, parent])

  // autofocus on welcome page for new users
  useEffect(() => {
    if (localStorage.getItem('homeFolder') === null) {
      initialValue = 'some content'
      setSelectedPage('welcome')
      setPageTitle('welcome')
      setShowEditor(true)
    }
  }, [setSelectedPage])

  /**
   * Handles user changing the title text for a page.
   */
  const titleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTitle = e.target.value
    setPageTitle(newTitle)
  }

  /**
   * When user blurs or hits enter, save updated page title
   */
  const saveTitleChange = () => {
    if (!selectedPage) return

    const result = parent.changePageTitle(selectedPage, pageTitle)

    switch (result) {
      case 'same':
        return
      case 'empty': {
        setPageTitle(selectedPage)
        return alert('A page title is required.')
      }
      case 'duplicate': {
        setPageTitle(selectedPage)
        return alert('A page with this title already exists.  Please use a different name.')
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
        className={(showEditor ? '' : 'hidden') + ' w-2/3 lg:w-[69%] h-11/12 max-h-[90vh]'}
        id="editor"
        key={key}
      >
        <TitleBar
          pageTitle={pageTitle}
          titleChange={titleChange}
          saveTitleChange={saveTitleChange}
        />
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          init={{
            width: '100%',
            height: '100%',
            skin: isDark ? 'oxide-dark' : 'oxide',
            content_css: isDark ? 'dark' : 'default',
            plugins: 'fullscreen',
            toolbar_sticky: true,
            menubar: 'false',
            statusbar: false,
            toolbar:
              'bold italic underline strikethrough hr | fontsize | alignleft aligncenter alignright | fullscreen',
            forced_root_block: 'div',
          }}
          initialValue={initialValue}
          onInit={(evt, editor) => (editorRef.current = editor)}
          onEditorChange={save}
        />
        <div className="w-full text-2xl">
          <div className="w-fit ml-5 mr-5 pt-2">Bonsai Notes</div>
        </div>
        {/* <button
          onClick={() => {
            console.log(editorRef?.current?.getContent())
          }}
        >test</button> */}
      </div>

      <Nav refreshEditor={refreshEditor} />
    </>
  )
}
