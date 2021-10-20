import * as vscode from 'vscode';
import { themeHighlightManager } from './ThemeHighlightManager';



export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.window.onDidChangeVisibleTextEditors(editors => themeHighlightManager.onOpenEditor(editors)),
		vscode.workspace.onDidChangeConfiguration(themeHighlightManager.onConfigChange),
	);

	themeHighlightManager.onOpenEditor();
}

export function deactivate() {
	themeHighlightManager.dispose();
}
