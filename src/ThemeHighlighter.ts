import * as vscode from "vscode";
import { highlightColorManager } from './ThemeManager';
import { match, MatchResult } from "./utils/string";

/**
 * 以编辑器维度管理颜色
 * todo:字符更新时取消对应字段的装饰器逻辑待优化
 * 当前逻辑，取消当前文档样式，重新设置
 */
export class ThemeHighLighter {
  private _editor: vscode.TextEditor;
  private _documentChangeDispose?: vscode.Disposable;
  // 性能优化用
  private _previousText?: string;
  private _colorRangeMap?: { [key: string]: vscode.Range[] } = {};

  constructor(editor: vscode.TextEditor) {
    this._editor = editor;
    this._documentChangeDispose = vscode.workspace.onDidChangeTextDocument(({ document }) => this.onUpdate(document));
  }


  public get editor() {
    return this._editor;
  }

  private onUpdate(document: vscode.TextDocument) {
    if (this._editor.document.uri.path !== document.uri.path) {
      return;
    }
    if (document.getText() === this._previousText) {
      return;
    }
    this.doHighlight();
  }

  public doHighlight() {
    if (highlightColorManager.isEmpty) {
      return;
    }
    const { document } = this._editor;
    const text = this._editor.document.getText();
    let startMatchIndex = 0;
    let matchResult: MatchResult | null = match(text, highlightColorManager.keysPattern, startMatchIndex);
    const newColorRangeMap: { [key: string]: vscode.Range[] } = {};

    while (matchResult) {
      const colorRanges = newColorRangeMap[matchResult.target] || [];
      const startPos = document.positionAt(matchResult.index);
      const endPos = document.positionAt(matchResult.index + matchResult.target.length);
      colorRanges.push(new vscode.Range(startPos, endPos));
      newColorRangeMap[matchResult.target] = colorRanges;
      startMatchIndex = matchResult.index + matchResult.target.length;
      matchResult = match(text, highlightColorManager.keysPattern, startMatchIndex);
    }
    for (let colorKey in newColorRangeMap) {
      this._editor.setDecorations(highlightColorManager.colorDecoratorMap[colorKey], newColorRangeMap[colorKey]);
    }
    for (let colorKey in this._colorRangeMap) {
      if (!newColorRangeMap[colorKey]) {
        this._editor.setDecorations(highlightColorManager.colorDecoratorMap[colorKey], []);
      }
    }
    this._colorRangeMap = newColorRangeMap;
    this._previousText = text;
  }

  public dispose() {
    this._documentChangeDispose?.dispose();
  }

}