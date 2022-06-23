import Page from "./Page";
// import NodeRef from "./NodeRef";

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

    /**
     * Takes in a path, returns the child object that the path refers to.
     * @param {array} path 
     * @returns object
     */
    navObj = (path) => {
        // only work on home level
        if (this.path.length > 1) throw "used at invalid depth";

        let copy = path.slice(1);
        let destination = this;
        while (copy.length > 0){
            destination = destination.nodes.find(node => node.title === copy[0]);
            copy.shift();
        }
        return destination;
    }

    findPage = (title) => {
        return this.pages.find((page) => page.title === title);
    }

    // nodeRefGen = (node) => {return node.nodes.slice().map((item) => new NodeRef(item.title, node.path))}
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

export {Node, createDummyHomeNode};
