import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { codeReducer, CodeState } from './shared/store/reducers/code.reducer';
import { userReducer, UserState } from './shared/store/reducers/user.reducer';

export interface AppState {
  user: UserState;
  code: CodeState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  code: codeReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
