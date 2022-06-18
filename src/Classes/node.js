import Page from "./Page";

class Node {
    /**
     * Every node has a full path including itself.  This is in contrast to pages, which only track their parent's path.
     * @param {string} title 
     * @param {array} parentPath 
     */
    constructor(title, parentPath){
        this.title = title;
        this.path = [...parentPath, title];
    }
    nodes = [];
    pages = [];
    /**
     * 
     * @param {string} title 
     */
    createChildNode = (title) => {this.nodes.push(new Node(title, this.path))}
    createPage = (title) => {this.pages.push(new Page(title, this.path))}
}

const createDummyHomeNode = () => {
    let testNode = new Node("Home", []);
    testNode.createChildNode("Node 1")  // path = ["Home", "Node 1"]
    testNode.createChildNode("Node 2")
    testNode.createChildNode("Node 3")
    testNode.createPage("Page 1")
    testNode.createPage("Page 2")
    return testNode;
}

/**
 * Takes in the home node and a path, returns destination node
 * @param {object} obj 
 * @param {array} path 
 * @returns object
 */
const navObj = (obj, path) => {
    let copy = path.slice(1);
    let destination = obj; 
    while (copy.length > 0){
        destination = destination.nodes.find(item => item.title === copy[0]);
        copy.shift();
    }

    return destination;
}



export {Node, createDummyHomeNode, navObj};
