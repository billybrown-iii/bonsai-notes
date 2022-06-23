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
  const [ selectedPage, setSelectedPage ] = useState(false);
  const parent = homeNode.navObj(path);

  return (
    <div className="App">
      <Sidebar path={path} setPath={setPath} parent={parent} homeNode={homeNode} setSelectedPage={setSelectedPage}/>
      <Editor selectedPage={selectedPage} parent={parent}/>
      <div onClick={() => {console.log(parent)}}>click me</div>
    </div>
  );
}

export default App;
