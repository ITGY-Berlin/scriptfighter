import { createReducer, on } from '@ngrx/store';
import {
  editorSaveCode,
  editorSaveSetShowEnemyCode,
  editorSaveShowEnemyCodeToggle,
  editorSetFontSize,
  editorSetIsPlaybackOpen,
  editorSetTheme,
  editorStoreCode,
} from '../actions/editor.actions';

export const EDITOR_STORE_KEY = 'editor';

export type MonacoTheme = 'vs-dark' | 'vs-light';

export interface EditorState {
  code: string | undefined;
  showEnemyCode: boolean;
  isPlaybackOpen: boolean;
  options: {
    // full list of options https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html#linenumbers
    readOnly: boolean;
    theme: MonacoTheme;
    fontSize: number;
    tabSize: number;
    language: string;
    minimap: { enabled: boolean };
  };
}

export const initialState: EditorState = {
  code: undefined,
  showEnemyCode: false,
  isPlaybackOpen: false,
  options: {
    readOnly: false,
    theme: 'vs-dark',
    fontSize: 12,
    tabSize: 2,
    language: 'javascript',
    minimap: { enabled: false },
  },
};

export const editorReducer = createReducer(
  initialState,
  on(editorStoreCode, (state, action): EditorState => ({ ...state, code: action.payload.code })),
  on(editorSaveCode, (state, action): EditorState => ({ ...state, code: action.payload.code })),
  on(editorSetIsPlaybackOpen, (state, action): EditorState => {
    if (action.payload.isPlaybackOpen === state.isPlaybackOpen) {
      return state;
    }
    return { ...state, isPlaybackOpen: action.payload.isPlaybackOpen };
  }),
  on(
    editorSaveShowEnemyCodeToggle,
    (state, action): EditorState => ({ ...state, showEnemyCode: !state.showEnemyCode }),
  ),
  on(editorSaveSetShowEnemyCode, (state, action): EditorState => ({ ...state, showEnemyCode: action.payload })),
  on(
    editorSetTheme,
    (state, action): EditorState => ({
      ...state,
      options: { ...state.options, theme: action.payload.theme },
    }),
  ),
  on(
    editorSetFontSize,
    (state, action): EditorState => ({
      ...state,
      options: { ...state.options, fontSize: action.payload.fontSize },
    }),
  ),
);
