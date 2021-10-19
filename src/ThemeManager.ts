import * as vscode from 'vscode';
import { transSafeWord as transToSafeWord } from './utils/string';


export type Theme = {
  [key: string]: string;
};

export type Themes = {
  [key: string]: Theme;
};

/**
 * 读取配置，管理高亮词语
 */
class HighlightColorManager {
  private _curThemeKey?: string;
  private _themes!: Themes;
  private _keysPattern!: RegExp;

  private _themeKeys!: string[];
  private _basicTheme!: Theme;
  private _curTheme!: Theme;

  constructor() {
    this.init();
  }

  private init() {
    this._themes = vscode.workspace.getConfiguration('highlight-my-word').get('themes', {});
    this._basicTheme = vscode.workspace.getConfiguration('highlight-my-word').get('basicTheme', {});
    this._curThemeKey = vscode.workspace.getConfiguration('highlight-my-word').get('curThemeKey', undefined);
    this._curTheme = this.mergeBasicTheme(this._curThemeKey);
    // 按长短排序，避免重复着色
    this._themeKeys = Object.keys(this.curTheme).sort((str1, str2) => str2.length - str1.length);
    const patternStr = `(${this._themeKeys.map((str) => { return transToSafeWord(str); }).join('|')})`;
    this._keysPattern = new RegExp(patternStr);
  }

  public reloadConfig() {
    this.init();
  }


  public get curTheme(): Theme {
    return this._curTheme;
  }

  public get themeKeys(): string[] {
    return this._themeKeys;
  }

  public get isEmpty() {
    return this._themeKeys.length === 0;
  }

  public get keysPattern(): RegExp {
    return this._keysPattern;
  }

  private mergeBasicTheme(themeKey?: string): Theme {
    if (!themeKey) {
      return { ...this._basicTheme };
    };
    if (!this._themes[themeKey]) {
      return { ...this._basicTheme };
    };
    return {
      ...this._basicTheme,
      ...this._themes[themeKey]
    };
  }

  public get mergedThemes(): Themes {
    const result: Themes = {};
    for (let key in this.mergedThemes) {
      result[key] = this.mergeBasicTheme(key);
    }
    return result;
  }



}

export const highlightColorManager = new HighlightColorManager();

