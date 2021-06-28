import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodeState, CODE_STORE_KEY } from '../reducers/code.reducer';

export const selectCode = createFeatureSelector<CodeState>(CODE_STORE_KEY);
export const selectCodeOne = createSelector(selectCode, (state) => state.codeOne);
export const selectCodeFighterOneName = createSelector(selectCode, (state) => state.fighterOneName);
export const selectCodeTwo = createSelector(selectCode, (state) => state.codeTwo);
export const selectCodeFighterTwoName = createSelector(selectCode, (state) => state.fighterTwoName);
