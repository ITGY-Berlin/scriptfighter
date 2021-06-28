import { createReducer, on } from '@ngrx/store';
import { userSet, userSetFighter, userUnset } from '../actions/user.actions';

export const USER_STORE_KEY = 'user';

// also same data stored in firebase
export interface UserFighter {
  code: string;
  name: string;
}

export interface UserState {
  readonly displayName: string | null;
  readonly email: string | null;
  readonly photoURL: string | null;
  readonly providerId: string | null;
  readonly fighter: UserFighter | null;
  /**
   * The user's unique ID.
   */
  readonly uid: string | null;
}

export const initialState: UserState = {
  email: null,
  displayName: null,
  photoURL: null,
  providerId: null,
  uid: null,
  fighter: null,
};

export const userReducer = createReducer(
  initialState,
  on(userSet, (state, action): UserState => ({ ...state, ...action.payload.user })),
  on(userUnset, (state, action): UserState => initialState),
  on(userSetFighter, (state, action): UserState => ({ ...state, fighter: action.payload.fighter })),
);
