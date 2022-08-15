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

  /** saves a changed folder name */
  // TODO prevent possibility of saving a duplicate name
  changeFolderName = (folder: Folder, newName: string) => {
    folder.title = newName;
    const newPath = folder.path
      .slice(0, folder.path.length - 1)
      .concat(newName);

    folder.path = newPath;
    updateChildPaths(folder, newPath);
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
      if (!next) throw new Error(`Folder "${copy[0]}" not found`);
      copy.shift();
    }
    return new FolderRef(next || homeFolder);
  };
}

const updateChildPaths = (folder: Folder, newPath: string[]) => {
  for (let page of folder.pages) {
    page.path = newPath.slice().concat(page.path.slice(newPath.length));
  }

  for (let childFolder of folder.folders) {
    childFolder.path = newPath
      .slice()
      .concat(childFolder.path.slice(newPath.length));
    updateChildPaths(childFolder, newPath);
  }
};
