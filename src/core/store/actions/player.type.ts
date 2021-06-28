import { Player, PlayerPosition, ScriptActionType } from '../models';

export const PLAYER_SET_NAME = 'PLAYER_SET_NAME';
export const PLAYER_SET_ACTION = 'PLAYER_SET_ACTION';
export const PLAYER_RESET = 'PLAYER_RESET';
export const PLAYER_CALCULATE_NEXT = 'PLAYER_CALCULATE_NEXT';

interface PlayerActionBase {
  readonly player: 1 | 2;
}

export interface PlayerResetAction extends PlayerActionBase {
  readonly type: typeof PLAYER_RESET;
  readonly position?: PlayerPosition;
}

export interface PlayerSetNameAction extends PlayerActionBase {
  readonly type: typeof PLAYER_SET_NAME;
  readonly name?: string;
}

export interface PlayerSetNextActionAction extends PlayerActionBase {
  readonly type: typeof PLAYER_SET_ACTION;
  readonly action: ScriptActionType;
}

export interface PlayerCalculateNextAction extends PlayerActionBase {
  readonly type: typeof PLAYER_CALCULATE_NEXT;
  readonly enemy: Player;
}

export type PlayerActionTypes = PlayerResetAction | PlayerSetNameAction | PlayerSetNextActionAction | PlayerCalculateNextAction;
