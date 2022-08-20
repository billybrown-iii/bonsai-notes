import { useState } from 'react'
import { createHomeFolder } from './Classes/Folder'
import './App.css'
import Main from './Main'

const storedNotes = localStorage.getItem('homeFolder')
const homeFolder = createHomeFolder(storedNotes)

console.log(homeFolder)

// if I save the pages in a modular fashion,
// I can totally call save() with every keystroke.

function App() {
  const [path, setPath] = useState(['Home'])
  const parent = homeFolder.navObj(path)
  console.log('parent declared')

  const saveNoteTree = () => {
    localStorage.setItem('homeFolder', JSON.stringify(homeFolder))
  }

  return (
    <>
      <Main parent={parent} path={path} setPath={setPath} saveNoteTree={saveNoteTree} />
      <button onClick={saveNoteTree}>Save</button>
      <button onClick={() => console.log('')}>Test</button>
    </>
  )
}

export default App
