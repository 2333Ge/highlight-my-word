import * as vscode from "vscode";
import { highlightColorManager } from './ThemeManager';
import { match, MatchResult } from "./utils/string";


type DecoratorMap = { [key: string]: vscode.TextEditorDecorationType };

/**
 * 以文档维度管理颜色装饰
 * todo:字符更新时取消对应字段的装饰器逻辑待优化
 * 当前逻辑，取消当前文档样式，重新设置
 */
export class ThemeHighLighter {
  _document: vscode.TextDocument;
  _decoratorMap: DecoratorMap = {};
  _documentChangeDispose?: vscode.Disposable;
  // 性能优化用
  _previousText?: string;

  constructor(document: vscode.TextDocument) {
    this._document = document;
    this._documentChangeDispose = vscode.workspace.onDidChangeTextDocument(({ document }) => this.onUpdate(document));
  }


  private createDecorator(colorKey: string): vscode.TextEditorDecorationType {
    const textColor = highlightColorManager.curTheme[colorKey][1] <= '9' ? '#fff' : '#333';
    return vscode.window.createTextEditorDecorationType({
      overviewRulerLane: vscode.OverviewRulerLane.Center,
      borderRadius: '2px',
      color: textColor,
      backgroundColor: highlightColorManager.curTheme[colorKey],
    });
  }

  private onUpdate(document: vscode.TextDocument) {
    if (this.document.uri.path !== document.uri.path) {
      return;
    }
    if (document.getText() === this._previousText) {
      return;
    }
    this.doHighlight(document);
  }

  public doHighlight(targetDocument = this.document) {
    if (highlightColorManager.isEmpty) {
      return;
    }
    const text = targetDocument.getText();
    let startMatchIndex = 0;
    let matchResult: MatchResult | null = match(text, highlightColorManager.keysPattern, startMatchIndex);
    const newColorRangeMap: { [key: string]: vscode.Range[] } = {};

    while (matchResult) {
      const colorRanges = newColorRangeMap[matchResult.target] || [];
      const startPos = targetDocument.positionAt(matchResult.index);
      const endPos = targetDocument.positionAt(matchResult.index + matchResult.target.length);
      colorRanges.push(new vscode.Range(startPos, endPos));
      newColorRangeMap[matchResult.target] = colorRanges;
      startMatchIndex = matchResult.index + matchResult.target.length;
      matchResult = match(text, highlightColorManager.keysPattern, startMatchIndex);
    }
    const targetEditors = vscode.window.visibleTextEditors
      .filter(({ document }) => document.uri === targetDocument.uri);
    this.dispose();
    for (let colorKey in newColorRangeMap) {
      this._decoratorMap[colorKey] = this.createDecorator(colorKey);
      targetEditors.forEach(editor => editor.setDecorations(this._decoratorMap[colorKey], newColorRangeMap[colorKey]));
    }
    this._previousText = text;
  }

  public get document() {
    return this._document;
  }

  public dispose() {
    Object.values(this._decoratorMap).forEach(de => de.dispose());
  }


}