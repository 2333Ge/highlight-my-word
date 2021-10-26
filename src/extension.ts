import * as vscode from 'vscode';
import { themeHighlightManager } from './ThemeHighlightManager';



export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.window.onDidChangeVisibleTextEditors(editors => themeHighlightManager.onOpenEditor(editors)),
		vscode.workspace.onDidChangeConfiguration(themeHighlightManager.onConfigChange),
		vscode.commands.registerCommand("command.chooseTheme", themeHighlightManager.onCommandChangeTheme),
		vscode.languages.registerHoverProvider(['javascript', 'typescript'], {
			provideHover: themeHighlightManager.provideHover,
		})
	);

	themeHighlightManager.onOpenEditor();
}

export function deactivate() {
	themeHighlightManager.dispose();
}
