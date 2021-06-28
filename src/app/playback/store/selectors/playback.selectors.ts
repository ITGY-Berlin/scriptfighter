import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlaybackState, PLAYBACK_STORE_KEY } from '../reducers/playback.reducer';

export const selectPlayback = createFeatureSelector<PlaybackState>(PLAYBACK_STORE_KEY);
export const selectPlaybackisPreparing = createSelector(selectPlayback, (state) => state.isPreparing);
export const selectPlaybackPlay = createSelector(selectPlayback, (state) => state.play);
export const selectPlaybackStateListIndex = createSelector(selectPlayback, (state) => state.stateListIndex);
export const selectPlaybackStateList = createSelector(selectPlayback, (state) => state.stateList);
