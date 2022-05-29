class Node {
    constructor(title){
        this.title = title;
    }
    nodes = [];
    pages = [];
    parent;
}


const createDummyHomeNode = () => {
    let testNode = new Node();
    testNode.nodes.push(new Node("node1"))
    testNode.nodes.push(new Node("node2"))
    testNode.nodes.push(new Node("node3"))
    return testNode;
}

const dummyHomeNode = createDummyHomeNode();

console.log(dummyHomeNode);

const test2 = "test"

export {Node, createDummyHomeNode};
// export {test2};

