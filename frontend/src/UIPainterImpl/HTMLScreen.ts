import { writeFileSync } from 'fs';
import { PathResolver } from '../modules/UIPainter/PathResolver';
import { Screen } from '../modules/UIPainter/Storage/Screen';
import { ClassFile } from '../modules/UIPainter/Storage/ClassFile';
import { View } from '../modules/UIPainter/Storage/View';
import { HTMLScreenInfo } from './HTMLScreenInfo';

export class HTMLScreen extends Screen {
  private info: HTMLScreenInfo;
  private chunks: Array<string>;

  private resolver: PathResolver;
  private appRootDir: string;

  setResolver(resolver: PathResolver) {
    this.resolver = resolver;
  }

  setAppRootDir(path: string) {
    this.appRootDir = path;
  }
  
  protected init(info: HTMLScreenInfo): void {
    this.info = info;
    this.chunks = [];
    this.chunks.push(
      `
      <head>
        <title>${info.title || 'No Title'}</title>
        <meta charset="${info.charset || ''}">
        <meta name="viewport" content="${info.viewport || ''}">
        <meta name="description" content="${info.description || ''}">
        <meta name="keywords" content="${info.keywords || ''}">
        <meta name="author" content="${info.author || ''}">
      </head>
      <body>
        <div id="root">
        </div>
      </body>
      <script>exports={}</script>
      `
    );
  }

  apply(view: View & ClassFile): void {
    if (!this.appRootDir || !this.resolver) {
      throw Error(`HTMLScreen: setRootDir & setResolver 
      should be invoked first before apply method.`);
    }

    this.chunks.push(
      `
      <script type="module" src="${
        this.resolver.relPath(this.appRootDir, view.getFilePath())
      }"></script>
      <script type="module">
        const view = new exports.${view.getClassName()}();
        view.draw();
      </script>
      `
    );
  }

  create(): void {
    if (!this.appRootDir || !this.resolver) {
      throw Error(`HTMLScreen: setRootDir should be invoked 
      first before create method.`);
    }

    const page = `
      <!DOCTYPE HTML>
      <html>
        ${this.chunks.join('')}
      </html>
    `;
    writeFileSync(`${this.appRootDir}/${this.info.name}.html`, page);
  }
}