// Editor.ts
import * as html from '../amp.html';
import { EditorInterface } from '../Interfaces';
declare var CodeMirror: typeof import('codemirror');
import { EditorListenerInterface } from '../Interfaces';

/**
 * Sort of a Factory function that builds an Editor class for us.
 */
export function createEditor(editorId: string, previewId: string, settings: object): EditorInterface {
  const cm = CodeMirror(document.getElementById(editorId) as HTMLTextAreaElement, settings);

  return new Editor(cm, document.getElementById(previewId));
}

class Editor implements EditorInterface {

  private codemirror: CodeMirror.Editor;
  private preview: HTMLElement;
  private delay: NodeJS.Timer;
  private listeners: EditorListenerInterface[];

  /**
   * Editor class
   * @param codemirror CodeMirror instance
   * @param preview    Preview area
   */
  constructor(codemirror: CodeMirror.Editor, preview: HTMLElement) {
    codemirror.setValue(html);
    this.codemirror = codemirror;
    this.preview = preview;
    this.listeners = new Array;
  }

  /**
   * Overwrite what is in the editor with the default template.
   */
  reset(): void {
    this.codemirror.setValue(html);
  }

  /**
   * Update the preview iframe with what is in the CodeMirror Editor
   */
  updatePreview(): void {
    // For some reason, unknown to me, `this.codemirror` would be undefined at
    // random times when editing code in CodeMirror.
    // @TODO Double check to see if this is still an issue.
    if(typeof this.codemirror !== "undefined") {
      this.preview.innerHTML = '';
      const iframe = document.createElement('iframe');
      this.preview.appendChild(iframe);

      const previewDoc = iframe.contentDocument || iframe.contentWindow.document;
      previewDoc.open();
      previewDoc.write(this.codemirror.getValue());
      previewDoc.close();
    }
  }

  /**
   * Start polling
   */
  start(interval: number): void {
    const _self = this;
    this.updatePreview();

    this.delay = global.setTimeout(this.updatePreview, interval);
    this.codemirror.on('change', () => {
      clearTimeout(_self.delay);
      _self.updatePreview();
      _self.delay = global.setTimeout(_self.updatePreview, interval);
      _self.onChange();
    });
  }

  /**
   * Get AMP HTML from CodeMirror Editor
   * @return string
   */
  getValue() {
    return this.codemirror.getValue();
  }
  
  /**
   * Add an event listener for the editor.
   *
   * This appends the listener to an array of EditorListenerInterface
   * @param  listener [description]
   */
  addListener(listener: EditorListenerInterface) {
      this.listeners.push(listener);
  }
  
  /**
   * onChange calls all the getNewHtml method on all the objects stored in 
   * the listeners property. Each object in that array implements the 
   * EditorListenerInterface and must have the getNewHtml method.
   */
  onChange() {
      for(let i=0; i<this.listeners.length; i++) {
          this.listeners[i].getNewHtml(this.codemirror.getValue());
      }
  }

  getCodemirror() {
    return this.codemirror;
  }

}
