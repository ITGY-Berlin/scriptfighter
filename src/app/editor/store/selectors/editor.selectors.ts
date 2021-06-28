import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorState, EDITOR_STORE_KEY, MonacoTheme } from '../reducers/editor.reducer';

export const selectEditor = createFeatureSelector<EditorState>(EDITOR_STORE_KEY);
export const selectEditorOptions = createSelector(selectEditor, (state: EditorState) => state.options);
export const selectEditorCode = createSelector(selectEditor, (state: EditorState) => state.code);
export const selectEditorIsReadOnly = createSelector(
  selectEditor,
  (state: EditorState) => state.showEnemyCode || state.options.readOnly,
);
export const selectEditorIsPlaybackOpen = createSelector(
  selectEditor,
  (state: EditorState): boolean => state.isPlaybackOpen,
);
export const selectEditorTheme = createSelector(
  selectEditorOptions,
  (state: EditorState['options']): MonacoTheme => state.theme,
);
export const selectEditorFontSize = createSelector(
  selectEditorOptions,
  (state: EditorState['options']): number => state.fontSize,
);
export const selectEditorTabSize = createSelector(
  selectEditorOptions,
  (state: EditorState['options']): number => state.tabSize,
);
export const selectEditorShowEnemyCode = createSelector(selectEditor, (state: EditorState) => state.showEnemyCode);
