import path = require("path");

export class PathResolver {
  private root: string = "";
  constructor(root: string) {
    this.root = root;
  }

  normalize(relpath: string): string {
    return path.normalize(this.root + '/' + relpath);
  }

  relPath(from: string, to: string): string {
    const fromSplitted = from.split('/');
    const toSplitted = to.split('/');
    
    let i = 0;
    for (; i < fromSplitted.length; i++) {
      if (fromSplitted[i] !== toSplitted[i])
        break;
    }
    toSplitted.splice(0, i);
    return '../' + toSplitted.join('/');
  }
}