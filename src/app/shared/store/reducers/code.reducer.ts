import { createReducer, on } from '@ngrx/store';
import { playerCodeDefault } from '@scriptfighter/core';
import { codeSetFigherOneName, codeSetFigherTwoName, codeSetOne, codeSetTwo } from '../actions/code.actions';

export const CODE_STORE_KEY = 'code';

export interface CodeState {
  readonly codeOne: string;
  readonly fighterOneName: string;
  readonly codeTwo: string;
  readonly fighterTwoName: string;
}

export const initialState: CodeState = {
  codeOne: playerCodeDefault,
  fighterOneName: 'unknown',
  codeTwo: playerCodeDefault,
  fighterTwoName: 'unknown',
};

export const codeReducer = createReducer(
  initialState,
  on(codeSetOne, (state, action): CodeState => ({ ...state, codeOne: action.payload.code })),
  on(codeSetTwo, (state, action): CodeState => ({ ...state, codeTwo: action.payload.code })),
  on(codeSetFigherOneName, (state, action): CodeState => ({ ...state, fighterOneName: action.payload.name })),
  on(codeSetFigherTwoName, (state, action): CodeState => ({ ...state, fighterTwoName: action.payload.name })),
);
