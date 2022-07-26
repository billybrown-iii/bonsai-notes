import Page from "./Page";
import FolderRef from "./FolderRef";
import PageRef from "./PageRef";

class Folder {
    /**
     * Folder-like containers.  Can contain folders and/or pages.
     * @param {string} title 
     * @param {array} parentPath 
     */
    constructor(title, parentPath){
        this.title = title;
        this.path = [...parentPath, title];
    }
    folders = [];
    pages = [];
    /**
     * @param {string} title 
     */
    createChildFolder = (title) => {this.folders.push(new Folder(title, this.path))}
    /**
     * @param {string} title 
     */
    createPage = (title) => {this.pages.push(new Page(title, this.path))}

    /**
     * Takes in a path, returns the child object that the path refers to.
     * @param {array} path 
     * @returns object
     */
    navObj = (path) => {
        // only work on home level
        if (this.path.length > 1) throw new Error("used at invalid depth");

        let copy = path.slice(1);
        let destination = this;
        while (copy.length > 0){
            destination = destination.folders.find(folder => folder.title === copy[0]);
            copy.shift();
        }
        return destination;
    }

    findPage = (title) => {
        return this.pages.find((page) => page.title === title);
    }

    /**
     * Generates folderRefs for UI display.
     * @returns array
     */
    folderRefGen = () => {return this.folders.slice().map((item) => new FolderRef(item.title, this.path))}

    /**
     * Generates pageRefs for UI display.
     * @returns array
     */
    pageRefGen = () => {return this.pages.slice().map((item) => new PageRef(item.title, item.path))}
}

const createDummyHomeFolder = () => {
    let testFolder = new Folder("Home", []);

    testFolder.createChildFolder("Folder 1")  // path = ["Home", "Folder 1"]
    testFolder.createChildFolder("Folder 2")
    testFolder.createPage("Page 1")
    testFolder.createPage("Page 2")
    return testFolder;
}

export {Folder, createDummyHomeFolder};
