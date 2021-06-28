import { createAction, props } from '@ngrx/store';
import { Action } from '../../../shared';
import { StateListItem } from '../reducers/playback.reducer';

export const playbackCalculateBegin = createAction('[playback] begin calculation');
export const playbackCalculateFinished = createAction(
  '[playback] finished calculation',
  props<Action<{ stateList: StateListItem[] }>>(),
);
export const playbackTogglePlay = createAction('[playback] toggle play');
export const playbackPlay = createAction('[playback] play');
export const playbackStop = createAction('[playback] Stop');
export const playbackIsPreparing = createAction(
  '[playback] Player is Preparing',
  props<Action<{ isPreparing: boolean }>>(),
);
export const playbackSetName = createAction(
  '[playback] Player set Name',
  props<Action<{ player: 1 | 2; name: string }>>(),
);
export const playbackSetStateListIndex = createAction(
  '[playback] Player set State List Index',
  props<Action<{ stateListIndex: number }>>(),
);
