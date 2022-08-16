import { useState } from "react";
import { createHomeFolder } from "./Classes/Folder";
import Sidebar from "./UI/Sidebar";
import Editor from "./UI/Editor";
import Nav from "./UI/Nav";
import "./App.css";

const storedNotes = localStorage.getItem("homeFolder");
const homeFolder = createHomeFolder(storedNotes);

// const homeFolder = new Folder("Home", []);
// homeFolder.populate(storedNotes);

console.log(homeFolder);

// TODO reduce props drilling, improve clarity
// composition using children possible via cloneElement
// example in codesandbox - jovial
function App() {
  const [path, setPath] = useState(["Home"]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const parent = homeFolder.navObj(path);

  // lift pageRefs state up, since Editor can adjust it by adjusting page title
  const [pageRefs, setPageRefs] = useState(homeFolder.pageRefGen());

  const [key, setKey] = useState(0);

  const deletePage = (title: string) => {
    parent.pages = parent.pages.filter((page) => page.title !== title);
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
