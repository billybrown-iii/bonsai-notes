
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

export default NodeRef;