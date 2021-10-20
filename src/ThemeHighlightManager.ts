import * as vscode from 'vscode';
import { ThemeHighlighter } from './ThemeHighlighter';

/**
 * 管理所有高亮情况
 */
class ThemeHighlightManager {
  private _hightLightList: ThemeHighlighter[] = [];


  public onOpenEditor(editors?: vscode.TextEditor[]) {
    if (editors === undefined) {
      editors = vscode.window.visibleTextEditors;
    }
    const changedEditors = editors.filter(item => !this.previousEditors.includes(item));
    const changeHighLightList = changedEditors.map(item => new ThemeHighlighter(item));
    changeHighLightList.map(item => item.doHighlight());

    const closedHighlightList = this._hightLightList.filter(({ editor }) => !vscode.window.visibleTextEditors.includes(editor));
    this.disposeHighlightList(closedHighlightList);

    this._hightLightList.push(...changeHighLightList);

  }

  get previousEditors(): vscode.TextEditor[] {
    return this._hightLightList.map(({ editor }) => editor);
  }

  public dispose() {
    this.disposeHighlightList(this._hightLightList);
  }

  private disposeHighlightList(list: ThemeHighlighter[] = []) {
    list.map(item => {
      item.dispose();
    });
    this._hightLightList = this._hightLightList.filter(item => !list.includes(item));
  }
}

export const themeHighlightManager = new ThemeHighlightManager();

