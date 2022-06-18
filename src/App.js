import { useState } from 'react';
import { Node, createDummyHomeNode, navObj } from './Classes/Node.js';
import Sidebar from './UI/Sidebar';
import Editor from './UI/Editor';
import './App.css';


const homeNode = createDummyHomeNode();
homeNode.createChildNode("Node 4");
console.log(homeNode);


function App() {

  const [ showEditor, setShowEditor ] = useState(false);
  const [ pagePath, setPagePath ] = useState(null)

  // the editor show/hide functionality should be outside the sidebar, all the way at the top level.
  // but my pageRefs need to be able to call it.

  // function showPage bubble all the way to PageList.  take in path.  from there, editor can render and update content.

  let pageContent = ""

  /**
   * 
   * @param {array} path 
   * @param {string} title 
   */
  const showPage = (path, title) => {
    const place = navObj(homeNode, path);
    pageContent = place.pages.find((page) => page.title === title).content;
    setShowEditor(true);
  }

  return (
    <div className="App">
      <Sidebar homeNode={homeNode} showPage={showPage}/>
      <Editor initialValue={""} pagePath={pagePath} showEditor={showEditor} homeNode={homeNode} />
      <div onClick={() => {console.log(homeNode)}}>click me</div>
    </div>
  );
}

export default App;
