import { createFeatureSelector } from '@ngrx/store';
import { UserState, USER_STORE_KEY } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>(USER_STORE_KEY);
