import { useState } from 'react';
import { Node, createDummyHomeNode } from './Classes/Node.js';
import Sidebar from './UI/Sidebar';
import Editor from './UI/Editor';
import './App.css';


const homeNode = createDummyHomeNode();
homeNode.createChildNode("Node 4");
console.log(homeNode);


function App() {

  const [ selectedPage, setSelectedPage ] = useState(null);
  const [ path, setPath ] = useState(["Home"]);
  const parent = homeNode.navObj(path);

  // if the user navigates to a different node, reset selectedPage to null
  if (selectedPage){
    if (selectedPage.path.length !== path.length || !selectedPage.path.every((item, index) => item === path[index])) setSelectedPage(null);
  }

  /**
   * 
   * @param {array} path - Path to node
   * @param {string} title - Page title
   * @returns {object} Page selection - Contains path to node and page title.
   */
  const showPage = (path, title) => {
    setSelectedPage({path, title});
  }

  const editor = (selectedPage ? <Editor selectedPage={selectedPage} homeNode={homeNode} parent={parent}/> : null)

  return (
    <div className="App">
      <Sidebar path={path} setPath={setPath} parent={parent} homeNode={homeNode} showPage={showPage}/>
      {editor}
      <div onClick={() => {console.log(selectedPage)}}>click me</div>
    </div>
  );
}

export default App;
