import { useState, useEffect, SetStateAction, Dispatch } from "react";
import FolderRef from "../Classes/FolderRef";
import PageRef from "../Classes/PageRef";
import FolderList from "./FolderList";
import PageList from "./PageList";
import feather from "feather-icons";
import { Folder } from "../Classes/Folder";
import MiniButton from "./MiniButton";

const backIcon = feather.icons["corner-left-up"].toSvg({ "stroke-width": 2 });
const homeIcon = feather.icons["home"].toSvg({ "stroke-width": 2 });
const newFolderIcon = feather.icons["folder-plus"].toSvg({ "stroke-width": 2 });
const newPageIcon = feather.icons["file-plus"].toSvg({ "stroke-width": 2 });

type Props = {
  path: string[];
  setPath: Dispatch<SetStateAction<string[]>>;
  parent: Folder;
  pageRefs: PageRef[];
  setPageRefs: Dispatch<SetStateAction<PageRef[]>>;
  selectedPage: string | null;
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  deletePage: (title: string) => void;
};

export default function Sidebar({
  path,
  setPath,
  parent,
  pageRefs,
  setPageRefs,
  selectedPage,
  setSelectedPage,
  deletePage,
}: Props) {
  const [folderRefs, setFolderRefs] = useState(parent.folderRefGen());

  // When the parent changes, update displayed folders/pages.
  // State setter functions are guaranteed to have a stable identity per the docs.
  // Therefore, it's fine to include as a dependency.
  useEffect(() => {
    setFolderRefs(parent.folderRefGen());
    setPageRefs(parent.pageRefGen());
  }, [parent, setPageRefs]);

  /** Adds a temporary placeholder folderRef, pending naming and confirmation */
  const newFolder = () => {
    const newFolderRef = new FolderRef("New Folder", path, true);
    setFolderRefs([...folderRefs, newFolderRef]);
  };

  /*** Adds new folderRef to UI and new folder to parent object */
  const addFolder = (title: string) => {
    title = title.trim();
    if (parent.folders.some((folder) => folder.title === title)) {
      setFolderRefs(folderRefs.slice(0, folderRefs.length - 1));
      alert(
        "There's already a folder with this title.  Please use a different name."
      );
      return;
    }

    // autoname pages if no name is provided
    if (title.length === 0) {
      let latestFolder = 1;
      for (let i = 0; i < folderRefs.length; i++) {
        if (folderRefs[i].title === "Folder " + latestFolder) {
          latestFolder++;
          i = -1;
        }
      }
      title = "Folder " + latestFolder;
    }

    setFolderRefs(
      folderRefs
        .slice(0, folderRefs.length - 1)
        .concat(new FolderRef(title, parent.path))
    );
    parent.createChildFolder(title);
  };

  /** Adds a temporary placeholder pageRef. */
  const newPage = () => {
    // TODO check for empty string title
    const newPageRef = new PageRef("New Page", null);
    setPageRefs([...pageRefs, newPageRef]);
  };

  /*** Adds new pageRef to UI and new page to parent object.*/
  const addPage = (title: string) => {
    title = title.trim();
    // check for dentical page titles in same folder
    if (parent.pages.some((page) => page.title === title)) {
      setPageRefs(pageRefs.slice(0, pageRefs.length - 1));
      alert(
        "There's already a page with this title.  Please use a different name."
      );
      return;
    }

    // autoname pages if no name is provided
    if (title.length === 0) {
      let latestPage = 1;
      for (let i = 0; i < pageRefs.length; i++) {
        if (pageRefs[i].title === "Page " + latestPage) {
          latestPage++;
          i = -1;
        }
      }
      title = "Page " + latestPage;
    }

    setPageRefs(
      pageRefs
        .slice(0, pageRefs.length - 1)
        .concat(new PageRef(title, parent.path))
    );
    parent.createPage(title);
    setSelectedPage(title);
  };

  const deleteFolder = (title: string) => {
    parent.folders = parent.folders.filter((folder) => folder.title !== title);
    setFolderRefs(parent.folderRefGen());
  };

  return (
    // TODO when create new folder or page, scroll to comfortably view
    <div
      id="sidebar"
      className="h-full w-1/3 overflow-auto border-r-2 border-zinc-500 dark:border-slate-100 select-none"
    >
      {/* Idea:
  Hover over parent, and arrow appears to the side, to show what clicking does.
   */}
      <div className="flex justify-around">
        <div
          id="parent-folder"
          onClick={() => {
            setSelectedPage(null);
            if (path.length > 1) setPath(path.slice(0, path.length - 1));
          }}
          className="flex group items-center relative z-10 w-3/5 rounded-b-2xl mx-auto p-3.5 pr-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <div
            id="back-icon"
            className="relative -ml-10 mx-1 invisible group-hover:visible"
            dangerouslySetInnerHTML={{
              __html: path.length > 1 ? backIcon : "",
            }}
          />
          <div className="text-xl m-auto">{" " + parent.title}</div>
        </div>
        <div className="-ml-10 mr-2.5 py-1">
          <MiniButton icon={newFolderIcon} func={newFolder} />
        </div>
      </div>

      <div id="sidebar-list" className="pb-10">
        <FolderList
          setPath={setPath}
          setSelectedPage={setSelectedPage}
          folderRefs={folderRefs}
          addFolder={addFolder}
          deleteFolder={deleteFolder}
        />

        <hr
          className={
            "w-11/12 m-auto mt-5 mb-4 " +
            (folderRefs.length > 0 && pageRefs.length > 0 ? "" : "")
          }
        />
        <div className="flex justify-around">
          <div className="w-3/5 m-auto">
            <PageList
              pageRefs={pageRefs}
              addPage={addPage}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              deletePage={deletePage}
            />
          </div>
          <div className="-ml-10 mr-2.5 -mt-1">
            <MiniButton icon={newPageIcon} func={newPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
