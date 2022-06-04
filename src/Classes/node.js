// 6/4/22 - removed circular parent reference
class Node {
    constructor(title){
        this.title = title;
    }
    nodes = [];
    pages = [];
}

const testNode0 = new Node()


const createDummyHomeNode = () => {
    let testNode = new Node("Home");
    testNode.nodes.push(new Node("node1"))
    testNode.nodes.push(new Node("node2"))
    testNode.nodes.push(new Node("node3"))
    return testNode;
}

const dummyHomeNode = createDummyHomeNode();


const test2 = "test"

export {Node, createDummyHomeNode};
// export {test2};

