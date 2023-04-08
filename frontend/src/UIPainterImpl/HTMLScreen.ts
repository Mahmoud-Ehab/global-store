import { writeFileSync } from 'fs';
import { Screen, ClassFile, View, ViewData } from '../modules/UIPainter/Storage';
import { HTMLScreenInfo } from './HTMLScreenInfo';
import { HTMLView } from './HTMLView';

export class HTMLScreen extends Screen {
  private info: HTMLScreenInfo;
  private chunks: Array<string>;

  private appRootDir: string;

  setRootDir(path: string) {
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

  apply(view: HTMLView & ClassFile): void {
    if (!this.appRootDir) {
      throw Error(`HTMLScreen: setRootDir should be invoked 
      first before apply method.`);
    }

    this.chunks.push(
      `
      <script type="module">
        import { ${view.getClassName()} } from '${view.getFilePath()}';
        const view = new ${view.getClassName()}();
        view.draw();
      </script>
      `
    );
  }

  create(): void {
    if (!this.appRootDir) {
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