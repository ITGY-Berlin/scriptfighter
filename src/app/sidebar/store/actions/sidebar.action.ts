import { createAction, props } from '@ngrx/store';
import { Action } from '../../../shared';
import { Theme } from '../../models/theme.enum';

export const sidebarOpen = createAction('[sidebar] Open');
export const sidebarClose = createAction('[sidebar] Close');
export const sidebarSetTheme = createAction('[sidebar] set Theme', props<Action<{ theme: Theme }>>());
export const sidebarSetExpand = createAction('[sidebar] expand', props<Action<boolean>>());
export const sidebarSetExistPortal = createAction('[sidebar] exist Portal', props<Action<boolean>>());
