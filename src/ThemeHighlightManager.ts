import * as vscode from 'vscode';
import { ThemeHighLighter } from './ThemeHighlighter';

class ThemeHighlightManager {
  private _hightLightList: ThemeHighLighter[] = [];


  public onOpenEditor(editors?: vscode.TextEditor[]) {
    if (editors === undefined) {
      editors = vscode.window.visibleTextEditors;
    }
    const changedEditors = editors.filter(item => !this.previousEditors.includes(item));
    const changeHighLightList = changedEditors.map(item => new ThemeHighLighter(item));
    changeHighLightList.map(item => item.doHighlight());

    const closedHighlightList = this._hightLightList.filter(({ editor }) => !vscode.window.visibleTextEditors.includes(editor));
    this.disposeHighLightList(closedHighlightList);

    this._hightLightList.push(...changeHighLightList);

  }

  get previousEditors(): vscode.TextEditor[] {
    return this._hightLightList.map(({ editor }) => (editor));
  }

  public dispose(){
    this.disposeHighLightList(this._hightLightList);
  }

  private disposeHighLightList(list: ThemeHighLighter[] = []) {
    list.map(item => {
      item.dispose();
    });
    this._hightLightList = this._hightLightList.filter(item => !list.includes(item));
  }
}

export const themeHighlightManager = new ThemeHighlightManager();

