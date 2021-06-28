import { createAction, props } from '@ngrx/store';
import { UserFighter, UserState } from '../reducers/user.reducer';
import { Action } from './base.action';

export const userLoadFirebase = createAction('[user] load user from firebase');
export const userSet = createAction('[user] set User', props<Action<{ user: UserState }>>());
export const userUnset = createAction('[user] unset User');
export const userSetFighter = createAction('[user] set Fighter', props<Action<{ fighter: UserFighter }>>());
