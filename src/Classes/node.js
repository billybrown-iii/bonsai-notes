

class Node {
    /**
     * 
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
}

const createDummyHomeNode = () => {
    let testNode = new Node("Home", []);
    testNode.createChildNode("Node 1")  // path = ["Home", "Node 1"]
    testNode.createChildNode("Node 2")
    testNode.createChildNode("Node 3")
    return testNode;
}


const navObj = (obj, path) => {
    let copy = path.slice(1);
    let destination = obj; 
    while (copy.length > 0){
        destination = destination.nodes.find(item => item.title === copy[0]);
        copy.shift();
    }

    return destination;
}

// const navToNode = (path) => {

// }

export {Node, createDummyHomeNode, navObj};
