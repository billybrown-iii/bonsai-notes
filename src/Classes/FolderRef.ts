/** Folder references, tracked in state for UI purposes. */

export default class FolderRef {
  title;
  path: string[];
  code?: string;
  constructor(title: string, parentPath: string[], code?: string) {
    this.title = title;
    this.path = [...parentPath, title];
    this.code = code;
  }
}
