
/** Node references, tracked in state for UI purposes. */
class NodeRef {
    /**
     * @param {string} title 
     * @param {array} [parentPath]
     */
    constructor(title, parentPath){
        this.title = title;
        this.path = [...parentPath, title];
    }
}

/**
 * Takes in a parent node and generates nodeRefs for UI display.
 * @param {object} node 
 * @returns object
 */
const nodeRefGen = (node) => {return node.nodes.slice().map((item) => new NodeRef(item.title, node.path))}

export { NodeRef, nodeRefGen };