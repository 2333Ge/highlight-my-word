import * as vscode from 'vscode';
import { transSafeWord as transToSafeWord } from './utils/string';


export type Theme = {
  [key: string]: string;
};

export type Themes = {
  [key: string]: Theme;
};

type DecoratorMap = { [key: string]: vscode.TextEditorDecorationType };


/**
 * 读取配置，管理高亮词语
 */
export class HighlightColorManager {
  public readonly curThemeKey?: string;
  public readonly themes: Themes;
  public readonly keysPattern: RegExp;
  public readonly themeKeys: string[];
  public readonly basicTheme: Theme;
  public readonly curTheme: Theme;
  public readonly colorDecoratorMap: DecoratorMap = {};

  private static _instance: HighlightColorManager;

  private constructor() {
    this.themes = vscode.workspace.getConfiguration('highlight-my-word').get('themes', {});
    this.basicTheme = vscode.workspace.getConfiguration('highlight-my-word').get('basicTheme', {});
    this.curThemeKey = vscode.workspace.getConfiguration('highlight-my-word').get('curThemeKey', '');
    this.curTheme = this._mergeBasicTheme(this.curThemeKey);
    // 按长短排序，避免重复着色
    this.themeKeys = Object.keys(this.curTheme).sort((str1, str2) => str2.length - str1.length);
    const patternStr = `(${this.themeKeys.map((str) => { return transToSafeWord(str); }).join('|')})`;
    this.keysPattern = new RegExp(patternStr);
    this.themeKeys.forEach(key => {
      this.colorDecoratorMap[key] = this._createDecorator(key);
    });
  }

  public static get instance(): HighlightColorManager {
    if (!HighlightColorManager._instance) {
      this._instance = new HighlightColorManager();
    }
    return this._instance;
  }

  public static reloadConfig() {
    HighlightColorManager.instance.dispose();
    HighlightColorManager._instance = new HighlightColorManager();

  }

  public static changeTheme(themeKey: string = '') {
    const { instance } = HighlightColorManager;
    if (themeKey === instance.curThemeKey) {
      return;
    }
    if (!themeKey && (instance.isUseBasicTheme)) {
      return;
    }
    vscode.workspace.getConfiguration('highlight-my-word').update('curThemeKey', themeKey);
    this.reloadConfig();
  }

  public get isEmpty(): boolean {
    return this.themeKeys.length === 0;
  }

  public get isUseBasicTheme(): boolean {
    return !this.curThemeKey || this.themeKeys.includes(this.curThemeKey)
  }

  public get themesKeys(): string[] {
    return Object.keys(this.themes);
  }


  public dispose() {
    Object.keys(this.colorDecoratorMap).forEach(key => {
      this.colorDecoratorMap[key].dispose();
    });
  }

  private _mergeBasicTheme(themeKey?: string): Theme {
    if (!themeKey) {
      return { ...this.basicTheme };
    };
    if (!this.themes[themeKey]) {
      return { ...this.basicTheme };
    };
    return {
      ...this.basicTheme,
      ...this.themes[themeKey]
    };
  }

  private _createDecorator(colorKey: string): vscode.TextEditorDecorationType {
    const textColor = this.curTheme[colorKey][1] <= '9' ? '#fff' : '#333';
    return vscode.window.createTextEditorDecorationType({
      overviewRulerColor: this.curTheme[colorKey],
      overviewRulerLane: vscode.OverviewRulerLane.Center,
      borderRadius: '2px',
      color: textColor,
      backgroundColor: this.curTheme[colorKey],
    });
  }

}
