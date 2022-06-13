
/** Node References, to be tracked in React state. */
class NodeRef {
    /**
     * 
     * @param {string} title 
     * @param {array} [path]
     * @param {boolean} [isNew] 
     */
    constructor(title, path, isNew){
        this.title = title;
        this.path = path;
        this.isNew = isNew;
    }
}

/**
 * Takes in a parent node and generates nodeRefs for UI display.
 * @param {object} node 
 * @returns object
 */
const nodeRefGen = (node) => {return node.nodes.slice().map((item) => new NodeRef(item.title, item.path))}

export { NodeRef, nodeRefGen };