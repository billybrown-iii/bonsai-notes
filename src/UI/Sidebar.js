import { useState, useEffect } from "react";
import FolderRef from "../Classes/FolderRef.js";
import PageRef from "../Classes/PageRef.js";
import FolderList from "./FolderList.js";
import PageList from "./PageList.js";
import feather from "feather-icons";

const backIcon = feather.icons["corner-left-up"].toSvg({ "stroke-width": 2 });
const homeIcon = feather.icons["home"].toSvg({ "stroke-width": 2 });

export default function Sidebar({
  path,
  setPath,
  parent,
  pageRefs,
  setPageRefs,
  selectedPage,
  setSelectedPage,
  deletePage,
}) {
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
    const newFolderRef = new FolderRef("New Folder", [null]);
    setFolderRefs([...folderRefs, newFolderRef]);
  };

  /**
   * Adds new folderRef to UI and new folder to parent object
   * @param {string} title
   */
  const addFolder = (title) => {
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
    const newPageRef = new PageRef("New Page", null);
    setPageRefs([...pageRefs, newPageRef]);
  };

  /**
   * Adds new pageRef to UI and new page to parent object.
   * @param {string} title
   */
  const addPage = (title) => {
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

  const deleteFolder = (title) => {
    parent.folders = parent.folders.filter((folder) => folder.title !== title);
    setFolderRefs(parent.folderRefGen());
  };

  return (
    // TODO when create new folder or page, scroll to comfortably view
    <div
      id="sidebar"
      className="h-full w-1/3 overflow-auto border-r-2 border-zinc-500 dark:border-slate-100 select-none"
    >
      {/* if you want it to stay on top, you'll need to redo your styling with vw units */}
      <div id="sidebar-btns" className="flex justify-end">
        <div
          onClick={newFolder}
          id="new-folder-btn"
          className="px-3 border-2 border-r-0 border-zinc-900 dark:border-slate-100"
        >
          New Folder
        </div>
        <div
          onClick={newPage}
          id="new-page-btn"
          className="px-3 border-2 border-zinc-900 dark:border-slate-100"
        >
          New Page
        </div>
      </div>

      <div
        id="back-button"
        onClick={() => {
          setSelectedPage(null);
          if (path.length > 1) setPath(path.slice(0, path.length - 1));
        }}
        className="flex relative z-10 w-3/4 rounded-2xl m-auto mt-10 -mb-3 items-center p-4 py-5 text-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <div
          id="back-icon"
          className="-my-1"
          dangerouslySetInnerHTML={{
            __html: path.length > 1 ? backIcon : homeIcon,
          }}
        />
        <div className="ml-2 text-xl">{" " + parent.title}</div>
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
            "w-11/12 m-auto mt-5 mb-6 " +
            (folderRefs.length > 0 && pageRefs.length > 0 ? "" : "hidden")
          }
        />
        <PageList
          pageRefs={pageRefs}
          addPage={addPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          deletePage={deletePage}
        />
      </div>
      
    </div>
  );
}
