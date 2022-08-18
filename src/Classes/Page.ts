export default class Page {
  title: string;
  path: string[];
  id: string;
  constructor(title: string, path: string[], id: string) {
    this.title = title;
    this.path = path;
    this.id = id;
  }
}
