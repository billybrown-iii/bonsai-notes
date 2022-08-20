import { useState } from 'react'
import { createHomeFolder } from './Classes/Folder'
import './App.css'
import Main from './Main'

const storedNotes = localStorage.getItem('homeFolder')
const homeFolder = createHomeFolder(storedNotes)

console.log(homeFolder)

function App() {
  const [path, setPath] = useState(['Home'])
  const parent = homeFolder.navObj(path)
  console.log('parent declared')

  const saveNoteTree = () => {
    localStorage.setItem('homeFolder', JSON.stringify(homeFolder))
  }

  return <Main parent={parent} path={path} setPath={setPath} saveNoteTree={saveNoteTree} />
}

export default App
