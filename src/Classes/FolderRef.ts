/** Folder references, tracked in state for UI purposes. */

import { Folder } from "./Folder";
import Page from "./Page";
import PageRef from "./PageRef";

export default class FolderRef {
  folderToRef: Folder;
  code: string | undefined;
  constructor(folderToRef: Folder, code?: string) {
    this.folderToRef = folderToRef;
    this.code = code;
  }

  createChildFolder = (title: string) => {
    this.folderToRef.folders.push(new Folder(title, this.folderToRef.path));
  };

  createPage = (title: string) => {
    this.folderToRef.pages.push(new Page(title, this.folderToRef.path));
  };

  findPage = (title: string | null) => {
    return this.folderToRef.pages.find((page) => page.title === title);
  };

  folderRefGen = () => {
    return this.folderToRef.folders.map((item) => new FolderRef(item));
  };

  pageRefGen = () => {
    return this.folderToRef.pages.map(
      (item) => new PageRef(item.title, item.path)
    );
  };

  populate = (savedNotes: string | null) => {
    if (!savedNotes) {
      // initial app state
      // const folder = new Folder("Home", []);

      this.createChildFolder("Folder 1"); // path = ["Home", "Folder 1"]
      this.createChildFolder("Folder 2");
      this.createPage("Page 1");
      this.createPage("Page 2");
      // return folder;
    } else {
      // uses savedNotes to populate content
      // const folder = JSON.parse(savedNotes);
      // return folder;
    }
  };

  /**
   * Takes in a path, returns ref of the child object that the path refers to.
   * @param {array} path
   * @returns object
   */
  navObj = (path: string[], homeFolder: Folder) => {
    let copy = path.slice(1);
    let next: Folder | undefined = homeFolder;
    while (copy.length > 0) {
      next = next?.folders.find((folder) => folder.title === copy[0]);
      if (!next) throw new Error("Folder not found");
      copy.shift();
    }
    return new FolderRef(next || homeFolder);
  };
}

// const createHomeFolder = (savedNotes: string | null) => {
//   if (!savedNotes) {
//     // initial app state
//     const folder = new Folder("Home", []);

//     folder.createChildFolder("Folder 1"); // path = ["Home", "Folder 1"]
//     folder.createChildFolder("Folder 2");
//     folder.createPage("Page 1");
//     folder.createPage("Page 2");
//     return folder;
//   } else {
//     // uses savedNotes to populate content
//     const folder = JSON.parse(savedNotes);
//     return folder;
//   }
// };

// type JsonPage = {
//   title: string;
//   content: string;
// };

// type JsonFolder = {
//   title: string;
//   path: string[];
//   folders: JsonFolder[];
//   pages: JsonPage[];
// };

// function populate(appObj: Folder, savedObj: JsonFolder) {
//   // populate the pages
//   for (const page of savedObj.pages) {
//     const append = new Page(page.title, appObj.path);
//     append.content = page.content;
//     appObj.pages.push(append);
//   }

//   // populate the folders
//   for (const folder of savedObj.folders) {
//     const append = new Folder(folder.title, appObj.path);
//     populate(append, folder);
//     appObj.folders.push(append);
//   }
// }

// pass in folderToRef

// functions like folderRefGen and createFolder are based on it

// therefore, the UI element is linked to the related JS boject, and able to modify it
