'use strict';
import * as vscode from 'vscode';
import { highlightColorManager } from './ThemeManager';
import { ThemeHighlightManager } from './ThemeHighlightManager';


export function activate(context: vscode.ExtensionContext) {

	const themeHighlightManager = new ThemeHighlightManager();
	context.subscriptions.push(
		vscode.window.onDidChangeVisibleTextEditors(editors => themeHighlightManager.onOpenEditor(editors)),
		vscode.workspace.onDidChangeConfiguration(() => {
			highlightColorManager.reloadConfig();
			themeHighlightManager.onOpenEditor();
		}),
	);

	themeHighlightManager.onOpenEditor();
}

export function deactivate() { }
