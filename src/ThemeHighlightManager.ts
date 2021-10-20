import * as vscode from 'vscode';
import { EditorHighlighter } from './EditorHighlighter';
import { HighlightColorManager } from './HighlightColorManager';

/**
 * 管理所有高亮情况
 */
class ThemeHighlightManager {
  private _hightLightList: EditorHighlighter[] = [];


  public onOpenEditor(editors?: vscode.TextEditor[]) {
    if (editors === undefined) {
      editors = vscode.window.visibleTextEditors;
    }
    const changedEditors = editors.filter(item => !this.previousEditors.includes(item));
    const changeHighLightList = changedEditors.map(item => new EditorHighlighter(item));
    changeHighLightList.map(item => item.doHighlight());

    const closedHighlightList = this._hightLightList.filter(({ editor }) => !vscode.window.visibleTextEditors.includes(editor));
    this.disposeHighlightList(closedHighlightList);

    this._hightLightList.push(...changeHighLightList);

  }

  public onConfigChange = () => {
    HighlightColorManager.reloadConfig();
    this.refresh();
  };

  public refresh() {
    this._hightLightList.forEach(item => item.doHighlight());
  }

  public dispose() {
    HighlightColorManager.instance.dispose();
    this.disposeHighlightList(this._hightLightList);
  }

  private get previousEditors(): vscode.TextEditor[] {
    return this._hightLightList.map(({ editor }) => editor);
  }



  private disposeHighlightList(list: EditorHighlighter[] = []) {
    list.map(item => {
      item.dispose();
    });
    this._hightLightList = this._hightLightList.filter(item => !list.includes(item));
  }
}

export const themeHighlightManager = new ThemeHighlightManager();

