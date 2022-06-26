import { useState, useEffect } from 'react';
import { Node, createDummyHomeNode } from './Classes/Node.js';
import Sidebar from './UI/Sidebar';
import Editor from './UI/Editor';
import './App.css';


const homeNode = createDummyHomeNode();
homeNode.createChildNode("Node 4");
console.log(homeNode);


function App() {

  const [ path, setPath ] = useState(["Home"]);
  const [ selectedPage, setSelectedPage ] = useState(null);
  const parent = homeNode.navObj(path);

  const element = document.getElementById("html");
  const isDark = element.classList.contains("dark");
  const [key, setKey] = useState(0);

  // TODO solve bug where you lose unsaved content
  const toggleDarkTheme = () => {
    (isDark ? element.classList.remove("dark") : element.classList.add("dark"));
    setKey((prev) => prev + 1);
  }

  return (
    <div className={"h-screen bg-slate-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"}>
      <div id="main" className='flex h-full'>
        <Sidebar path={path} setPath={setPath} parent={parent} setSelectedPage={setSelectedPage}/>
        <Editor selectedPage={selectedPage} parent={parent} isDark={isDark} counter={key}/>
      </div>

      <div onClick={toggleDarkTheme} className="absolute top-0 right-4 h-16">Dark Theme</div>
    </div>
  );
}

export default App;
