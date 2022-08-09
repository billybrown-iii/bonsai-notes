import { useState } from "react";
import { createDummyHomeFolder } from "./Classes/Folder";
import Sidebar from "./UI/Sidebar";
import Editor from "./UI/Editor";
import Nav from "./UI/Nav";
import "./App.css";

const homeNode = createDummyHomeFolder();
console.log(homeNode);

// TODO reduce props drilling, improve clarity
// composition using children possible via cloneElement
// example in codesandbox - jovial
function App() {
  const [path, setPath] = useState(["Home"]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const parent = homeNode.navObj(path);

  // lift pageRefs state up, since Editor can adjust it by adjusting page title
  const [pageRefs, setPageRefs] = useState(homeNode.pageRefGen());

  const [key, setKey] = useState(0);

  const deletePage = (title: string) => {
    parent.pages = parent.pages.filter((page) => page.title !== title);
    setPageRefs(parent.pageRefGen());
    if (title === selectedPage) setSelectedPage(null);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-neutral-500 via-neutral-700 to-neutral-500 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      {/* <div className=' bg-gradient-to-r from-slate-600'>Hello</div> */}
      <div
        id="main"
        className="relative flex flex-wrap h-full w-full max-w-screen-xl min-w-[768px] m-auto bg-neutral-100 dark:bg-gray-800 text-zinc-900 dark:text-zinc-50"
      >
        <Sidebar
          path={path}
          setPath={setPath}
          parent={parent}
          pageRefs={pageRefs}
          setPageRefs={setPageRefs}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          deletePage={deletePage}
        />
        <Editor
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          parent={parent}
          setPageRefs={setPageRefs}
          keyProp={key}
        />
        <Nav setKey={setKey} />
      </div>
    </div>
  );
}

export default App;
