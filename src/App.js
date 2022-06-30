import { useState } from 'react';
import { createDummyHomeNode } from './Classes/Node.js';
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

  return (
    <div className={"h-screen bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"}>
      <div id="main" className='flex h-full w-full max-w-screen-2xl m-auto'>
        <Sidebar path={path} setPath={setPath} parent={parent} setSelectedPage={setSelectedPage}/>
        <Editor selectedPage={selectedPage} parent={parent} />
      </div>
    </div>
  );
}

export default App;
