/** Folder references, tracked in state for UI purposes. */

export default class FolderRef {
  title;
  path: string[];
  isNew?: boolean;
  constructor(title: string, parentPath: string[], isNew?: boolean) {
    this.title = title;
    this.path = [...parentPath, title];
    this.isNew = isNew;
  }
}
