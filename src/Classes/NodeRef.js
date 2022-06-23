
/** Node references, tracked in state for UI purposes. */
export default class NodeRef {
    /**
     * @param {string} title 
     * @param {array} [parentPath]
     */
    constructor(title, parentPath){
        this.title = title;
        this.path = [...parentPath, title];
    }
}

