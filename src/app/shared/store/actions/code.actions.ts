import { createAction, props } from '@ngrx/store';
import { Action } from './base.action';

export const codeSetOne = createAction('[code] set Code One', props<Action<{ code: string }>>());
export const codeSetFigherOneName = createAction('[code] set Fighter one name', props<Action<{ name: string }>>());
export const codeSetTwo = createAction('[code] set Code Two', props<Action<{ code: string }>>());
export const codeSetFigherTwoName = createAction('[code] set Fighter two name', props<Action<{ name: string }>>());
