/** Page references, tracked in state for UI purposes. */
class PageRef{
    /**
     * @param {string} title 
     * @param {array} path 
     */
    constructor (title, path){
        this.title = title;
        this.path = path;
    }
}

/**
 * Takes in a parent node and generates pageRefs for UI display.
 * @param {object} node 
 * @returns array
 */
const pageRefGen = (node) => {return node.pages.slice().map((item) => new PageRef(item.title, item.path))}

export { PageRef, pageRefGen }