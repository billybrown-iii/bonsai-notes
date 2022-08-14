import { useState } from "react";
import FolderRef from "./Classes/FolderRef";
import Sidebar from "./UI/Sidebar";
import Editor from "./UI/Editor";
import Nav from "./UI/Nav";
import "./App.css";
import { Folder } from "./Classes/Folder";

// const storedNotes = localStorage.getItem("homeFolder");
// console.log(storedNotes);
const homeFolder = new Folder("Home", []);
const homeRef = new FolderRef(homeFolder);
homeRef.populate(null);

console.log(homeFolder);

// TODO reduce props drilling, improve clarity
// composition using children possible via cloneElement
// example in codesandbox - jovial
function App() {
  const [path, setPath] = useState(["Home"]);
  const parent = homeRef.navObj(path, homeFolder);

  // lift pageRefs state up, since Editor can adjust it by adjusting page title
  const [pageRefs, setPageRefs] = useState(parent.pageRefGen());
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [key, setKey] = useState(0);

  const deletePage = (title: string) => {
    // parentRef.folderToRef = parentRef.folderToRef.pages.filter((page) => page.title !== title);
    // console.log(parentRef.folderToRef.pages.filter((page) => page.title !== title))
    const folder = parent.folderToRef;
    folder.pages = folder.pages.filter((page) => page.title !== title);
    setPageRefs(parent.pageRefGen());
    if (title === selectedPage) setSelectedPage(null);
  };

  const save = () => {
    localStorage.setItem("homeFolder", JSON.stringify(homeFolder));
  };

  // add local storage
  // anytime you mutate the pageRefs or folderRefs, or edit the content of a page, it should reset a save timeout.

  return (
    <div className="h-screen bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      {/* <div className=' bg-gradient-to-r from-slate-600'>Hello</div> */}
      <div
        id="main"
        className="relative flex flex-wrap h-full w-full max-w-screen-xl min-w-[768px] m-auto bg-neutral-100 dark:bg-gray-800 text-zinc-900 dark:text-zinc-50"
      >
        <Sidebar
          path={path}
          setPath={setPath}
          parent={parent}
          homeRef={homeRef}
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
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}

export default App;
