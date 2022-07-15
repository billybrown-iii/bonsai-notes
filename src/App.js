import { useState } from 'react';
import { createDummyHomeNode } from './Classes/Node.js';
import Sidebar from './UI/Sidebar';
import Editor from './UI/Editor';
import Nav from './UI/Nav';
import './App.css';

const homeNode = createDummyHomeNode();
console.log(homeNode);

function App() {
  const [ path, setPath ] = useState(["Home"]);
  const [ selectedPage, setSelectedPage ] = useState(null);
  const parent = homeNode.navObj(path);

    // lift pageRefs state up, since Editor can adjust it by adjusting page title
  const [pageRefs, setPageRefs] = useState(homeNode.pageRefGen());

  const deletePage = () => {
    if (!selectedPage) throw new Error("Attempted to delete page, but no page is selected.")
    const title = selectedPage;
    parent.pages = parent.pages.filter((page) => page.title !== title);
    setPageRefs(parent.pageRefGen());
    setSelectedPage(null);
  }

  return (
    <div className="h-screen bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-100 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-800">
      {/* <div className=' bg-gradient-to-r from-slate-600'>Hello</div> */}
      <div id="main" className='relative flex flex-wrap h-full w-full max-w-screen-xl m-auto bg-slate-100 dark:bg-gray-700 text-zinc-900 dark:text-zinc-50'>
        <Sidebar path={path} setPath={setPath} parent={parent} pageRefs={pageRefs} setPageRefs={setPageRefs} setSelectedPage={setSelectedPage}/>
        <Editor selectedPage={selectedPage} setSelectedPage={setSelectedPage} parent={parent} setPageRefs={setPageRefs} />
        {/* TODO issue: nav area gets in the way of clicking UI located beneath. */}
        <Nav selectedPage={selectedPage} deletePage={deletePage}/>
      </div>
    </div>
  );
}

export default App;
