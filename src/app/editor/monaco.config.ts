import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { workerTypescriptDefinition } from './worker-definition';

declare const monaco: any;

export const MonacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {
    monaco.languages.typescript.javascriptDefaults.addExtraLib(workerTypescriptDefinition);
  },
};
