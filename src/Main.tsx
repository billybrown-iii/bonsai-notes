import { Dispatch, SetStateAction, useState } from "react";
import { Folder } from "./Classes/Folder";
import Editor from "./UI/Editor";
import Nav from "./UI/Nav";
import Sidebar from "./UI/Sidebar";

type Props = {
  parent: Folder;
  path: string[];
  setPath: Dispatch<SetStateAction<string[]>>;
};

// in order to avoid redeclaring parent every time there's a change to pages, split into Main / Layout component
const Main = ({ parent, path, setPath }: Props) => {
  const [pageRefs, setPageRefs] = useState(parent.pageRefGen());
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [key, setKey] = useState(0);

  const deletePage = (title: string) => {
    parent.deletePage(title);
    setPageRefs(parent.pageRefGen());
    if (title === selectedPage) setSelectedPage(null);
  };

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
      </div>
    </div>
  );
};

export default Main;
