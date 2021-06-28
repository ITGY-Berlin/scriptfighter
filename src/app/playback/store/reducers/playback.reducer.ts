import { createReducer, on } from '@ngrx/store';
import { initialPlayers, initialPlayground, Player, Playground } from '@scriptfighter/core';
import {
  playbackCalculateBegin,
  playbackCalculateFinished,
  playbackIsPreparing,
  playbackPlay,
  playbackSetName,
  playbackSetStateListIndex,
  playbackStop,
  playbackTogglePlay,
} from '../actions/playback.actions';

export const PLAYBACK_STORE_KEY = 'playback';

export interface StateListItem {
  playground: Playground;
  players: Player[];
}

export interface PlaybackState {
  readonly play: boolean;
  readonly stateListIndex: number;
  readonly isPreparing: boolean;
  readonly stateList: StateListItem[];
}

export const initialState: PlaybackState = {
  play: false,
  isPreparing: false,
  stateList: [{ playground: initialPlayground(), players: initialPlayers() }],
  stateListIndex: 0,
};

export const scriptPlayerReducer = createReducer(
  initialState,
  on(playbackCalculateBegin, (state, action): PlaybackState => ({ ...state, play: false, isPreparing: true })),
  on(
    playbackCalculateFinished,
    (state, action): PlaybackState => ({
      ...state,
      isPreparing: false,
      stateList: action.payload.stateList,
    }),
  ),
  on(playbackTogglePlay, (state, action): PlaybackState => {
    const currentPlay = state.play;
    return { ...state, play: !currentPlay };
  }),
  on(playbackPlay, (state, action): PlaybackState => ({ ...state, play: true })),
  on(playbackStop, (state, action): PlaybackState => ({ ...state, play: false })),
  on(playbackIsPreparing, (state, action): PlaybackState => ({ ...state, isPreparing: action.payload.isPreparing })),
  on(playbackSetName, (state, action): PlaybackState => {
    const newStateList = replacePlayerName(state.stateList, action.payload.player, action.payload.name);
    if (newStateList === state.stateList) {
      return state;
    }
    return { ...state, stateList: newStateList };
  }),
  on(
    playbackSetStateListIndex,
    (state, action): PlaybackState => ({ ...state, stateListIndex: action.payload.stateListIndex }),
  ),
);

function replacePlayerName(stateList: StateListItem[], player: 1 | 2, name: string): StateListItem[] {
  // if name same like before
  if (stateList[0].players[player - 1].name === name) {
    return stateList;
  }
  return stateList.map((stateItem) => {
    const newPlayer = { ...stateItem.players[player], name };
    if (player === 1) {
      return { ...stateItem, players: [newPlayer, stateItem.players[1]] };
    }
    return { ...stateItem, players: [stateItem.players[0], newPlayer] };
  });
}
