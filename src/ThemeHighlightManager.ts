import * as vscode from 'vscode';
import { EditorHighlighter } from './EditorHighlighter';
import { HighlightColorManager } from './HighlightColorManager';
import { BASIC_THEME_DESC, EXTENSION_TITLE } from './utils/const';

/**
 * 管理所有高亮情况
 */
class ThemeHighlightManager {
  private _hightLightList: EditorHighlighter[] = [];
  private _statusBar!: vscode.StatusBarItem;

  constructor() {
    this._statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    this._upDateStatusBarDesc();
    this._statusBar.command = 'command.chooseTheme';
    this._statusBar.tooltip = '点击切换主题';
    this._statusBar.show();
  }


  public onOpenEditor(editors?: vscode.TextEditor[]) {
    if (editors === undefined) {
      editors = vscode.window.visibleTextEditors;
    }
    const previousEditors = this._hightLightList.map(({ editor }) => editor);
    const changedEditors = editors.filter(item => !previousEditors.includes(item));
    const changeHighLightList = changedEditors.map(item => new EditorHighlighter(item));
    changeHighLightList.map(item => item.doHighlight());

    const closedHighlightList = this._hightLightList.filter(({ editor }) => !vscode.window.visibleTextEditors.includes(editor));
    this._disposeHighlightList(closedHighlightList);

    this._hightLightList.push(...changeHighLightList);

  }

  public onConfigChange = () => {
    HighlightColorManager.reloadConfig();
    this.refresh();
  };

  public onCommandChangeTheme = () => {
    vscode.window.showQuickPick([
      BASIC_THEME_DESC,
      ...HighlightColorManager.instance.themesKeys,
    ], {
      canPickMany: false,
      placeHolder: "选择您的主题"
    }).then((res) => {
      HighlightColorManager.changeTheme(res === BASIC_THEME_DESC ? undefined : res);
      this.refresh();
    });
  };

  public refresh() {
    this._upDateStatusBarDesc();
    this._hightLightList.forEach(item => item.doHighlight());
  }

  public dispose() {
    HighlightColorManager.instance.dispose();
    this._statusBar.dispose();
    this._disposeHighlightList(this._hightLightList);
  }


  private _upDateStatusBarDesc() {
    this._statusBar.text = `${EXTENSION_TITLE}(${HighlightColorManager.instance.curThemeKey || BASIC_THEME_DESC})`;
  }

  private _disposeHighlightList(list: EditorHighlighter[] = []) {
    list.map(item => {
      item.dispose();
    });
    this._hightLightList = this._hightLightList.filter(item => !list.includes(item));
  }
}

export const themeHighlightManager = new ThemeHighlightManager();

