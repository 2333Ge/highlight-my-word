import * as vscode from 'vscode';
import { ThemeHighLighter } from './ThemeHighlighter';

export class ThemeHighlightManager {
  _hightLightList: ThemeHighLighter[] = [];

  public onOpenEditor(editors?: vscode.TextEditor[]) {
    if (editors === undefined) {
      editors = vscode.window.visibleTextEditors;
    }
    const curDocuments = editors.map(({ document }) => document);
    const previousDocuments = this._hightLightList.map(({ document }) => document);

    const changedDocuments = curDocuments.filter(item => !previousDocuments.includes(item));
    const changeHighLightList = changedDocuments.map(item => new ThemeHighLighter(item));
    changeHighLightList.map(item => item.doHighlight());

    this._hightLightList = this._hightLightList.filter(({ document }) => curDocuments.includes(document));
    this._hightLightList.push(...changeHighLightList);
  }



}
