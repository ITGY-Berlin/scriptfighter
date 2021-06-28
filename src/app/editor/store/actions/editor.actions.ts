import { createAction, props } from '@ngrx/store';
import { Action } from '../../../shared';
import { MonacoTheme } from '../reducers/editor.reducer';

export const editorStoreCode = createAction('[editor] store Code', props<Action<{ code: string }>>());
export const editorSaveCode = createAction('[editor] save Code', props<Action<{ code: string }>>());
export const editorSaveSetShowEnemyCode = createAction('[editor] show enemy code', props<Action<boolean>>());
export const editorSaveShowEnemyCodeToggle = createAction('[editor] toggle show enemy code');
export const editorPushCode = createAction('[editor] save Code in the cloud ', props<Action<{ code: string }>>());
export const editorTriggerToggleIsPlaybackOpen = createAction('[editor] Trigger Toggle Playback is Open');
export const editorTriggerIsPlaybackOpen = createAction(
  '[editor] Trigger Playback is Open',
  props<Action<{ isPlaybackOpen: boolean }>>(),
);
export const editorSetIsPlaybackOpen = createAction(
  '[editor] Playback is Open',
  props<Action<{ isPlaybackOpen: boolean }>>(),
);
export const editorSetTheme = createAction('[editor] Settings set Theme', props<Action<{ theme: MonacoTheme }>>());
export const editorSetFontSize = createAction('[editor] Settings set Font Size', props<Action<{ fontSize: number }>>());
