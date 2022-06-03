class Node {
    constructor(title, parent){
        this.title = title;
        this.parent = parent;
    }
    nodes = [];
    pages = [];
}


const createDummyHomeNode = () => {
    let testNode = new Node("Home");
    testNode.nodes.push(new Node("node1", testNode))
    testNode.nodes.push(new Node("node2", testNode))
    testNode.nodes.push(new Node("node3", testNode))
    return testNode;
}

const dummyHomeNode = createDummyHomeNode();

console.log(dummyHomeNode);

const test2 = "test"

export {Node, createDummyHomeNode};
// export {test2};

