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
    <div className="h-screen bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-100 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700">
      {/* <div className=' bg-gradient-to-r from-slate-600'>Hello</div> */}
      <div id="main" className='flex h-full w-full max-w-screen-xl m-auto bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50'>
        <Sidebar path={path} setPath={setPath} parent={parent} selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
        <Editor selectedPage={selectedPage} setSelectedPage={setSelectedPage} parent={parent} />
      </div>
    </div>
  );
}

export default App;
