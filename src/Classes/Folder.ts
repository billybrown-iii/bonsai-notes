import Page from "./Page";

// convert to purely JSON-compatible object
class Folder {
  constructor(title: string, parentPath: string[]) {
    this.title = title;
    this.path = [...parentPath, title];
  }

  title: string;
  path: string[];

  folders: Folder[] = [];
  pages: Page[] = [];
}

const defaultFolder = new Folder("Home", []);

defaultFolder.folders.push(new Folder("Folder 1", ["Home"]));
defaultFolder.folders.push(new Folder("Folder 2", ["Home"]));
defaultFolder.pages.push(new Page("Welcome to Bonsai Notes", ["Home"]));

export { Folder, defaultFolder };

/**
 * Takes in a path, returns the child object that the path refers to.
 * @param {array} path
 * @returns object
 */
// navObj = (path: string[]) => {
//   // only work on home level
//   if (this.path.length > 1) throw new Error("used at invalid depth");

//   let copy = path.slice(1);
//   const homeFolder = this;
//   let next: Folder | undefined = homeFolder;
//   while (copy.length > 0) {
//     next = next?.folders.find((folder) => folder.title === copy[0]);
//     if (!next) throw new Error("Folder not found");
//     copy.shift();
//   }
//   return next || homeFolder;
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
//     const folder = new Folder("Home", []);
//     const obj = JSON.parse(savedNotes);
//     populate(folder, obj);
//     return folder;
//   }
// };

// /** Takes in the home folder (or child folders on recursive calls) for the first argument, and the parsed JSON as the 2nd. */
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
