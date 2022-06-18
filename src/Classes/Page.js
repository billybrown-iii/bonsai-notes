export default class Page {
    /**
     * 
     * @param { string } title 
     * @param { array } path 
     */
    constructor(title, path){
        this.title = title;
        this.path = path;
    }
    content = "";
}