import { useState } from 'react';
import { Node, createDummyHomeNode } from './Classes/Node.js';
import Sidebar from './UI/Sidebar';
import Editor from './UI/Editor';
import './App.css';


const homeNode = createDummyHomeNode();
homeNode.createChildNode("Node 4");
console.log(homeNode);


function App() {

  // const [ showEditor, setShowEditor ] = useState(false);
  const [ pagePath, setPagePath ] = useState(null)
  const [path, setPath] = useState(["Home"]);
  const parent = homeNode.navObj(path);

  // the editor show/hide functionality should be outside the sidebar, all the way at the top level.
  // but my pageRefs need to be able to call it.

  // function showPage bubble all the way to PageList.  take in path.  from there, editor can render and update content.

  let pageContent = ""

  /**
   * 
   * @param {array} path - Path to node
   * @param {string} title - Page title 
   */
  const showPage = (path, title) => {
    // const place = navObj(homeNode, path);
    // pageContent = place.pages.find((page) => page.title === title).content;
    setPagePath({path, title});
  }

  return (
    <div className="App">
      <Sidebar path={path} setPath={setPath} parent={parent} homeNode={homeNode} showPage={showPage}/>
      <Editor initialValue={""} pagePath={pagePath} homeNode={homeNode} parent={parent}/>
      {/* <div onClick={() => {console.log(homeNode)}}>click me</div> */}
    </div>
  );
}

export default App;
