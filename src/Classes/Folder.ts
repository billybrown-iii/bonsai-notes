import Page from "./Page";
import FolderRef from "./FolderRef";
import PageRef from "./PageRef";

class Folder {
  /**
   * Folder-like containers.  Can contain folders and/or pages.
   * @param {string} title
   * @param {array} parentPath
   */
  constructor(title: string, parentPath: string[]) {
    this.title = title;
    this.path = [...parentPath, title];
  }

  title: string;
  path: string[];

  folders: Folder[] = [];
  pages: Page[] = [];
  /**
   * @param {string} title
   */
  createChildFolder = (title: string) => {
    this.folders.push(new Folder(title, this.path));
  };
  /**
   * @param {string} title
   */
  createPage = (title: string) => {
    this.pages.push(new Page(title, this.path));
  };

  /**
   * Takes in a path, returns the child object that the path refers to.
   * @param {array} path
   * @returns object
   */
  navObj = (path: string[]) => {
    // only work on home level
    if (this.path.length > 1) throw new Error("used at invalid depth");

    let copy = path.slice(1);
    const homeFolder = this;
    let next: Folder | undefined = homeFolder;
    while (copy.length > 0) {
      next = next?.folders.find((folder) => folder.title === copy[0]);
      if (!next) throw new Error("Folder not found");
      copy.shift();
    }
    return next || homeFolder;
  };

  findPage = (title: string | null) => {
    return this.pages.find((page) => page.title === title);
  };

  /**
   * Generates folderRefs for UI display.
   * @returns array
   */
  folderRefGen = () => {
    return this.folders
      .slice()
      .map((item) => new FolderRef(item.title, this.path));
  };

  /**
   * Generates pageRefs for UI display.
   * @returns array
   */
  pageRefGen = () => {
    return this.pages.slice().map((item) => new PageRef(item.title, item.path));
  };
}

const createDummyHomeFolder = () => {
  let testFolder = new Folder("Home", []);

  testFolder.createChildFolder("Folder 1"); // path = ["Home", "Folder 1"]
  testFolder.createChildFolder("Folder 2");
  testFolder.createPage("Page 1");
  testFolder.createPage("Page 2");
  return testFolder;
};

export { Folder, createDummyHomeFolder };
