import { Player, PlayerPosition, ScriptActionType } from '../models';
import {
    PLAYER_CALCULATE_NEXT, PLAYER_RESET, PLAYER_SET_ACTION, PLAYER_SET_NAME, PlayerActionTypes
} from './player.type';

export function playerSetName(name: string, player: 1 | 2): PlayerActionTypes {
  return {
    type: PLAYER_SET_NAME,
    player,
    name
  };
}

export function playerSetAction(action: ScriptActionType, player: 1 | 2): PlayerActionTypes {
  return {
    type: PLAYER_SET_ACTION,
    player,
    action
  };
}

export function playerReset(position: PlayerPosition, player: 1 | 2): PlayerActionTypes {
  return {
    type: PLAYER_RESET,
    player,
    position
  };
}

export function playerCalculateNext(enemy: Player, player: 1 | 2): PlayerActionTypes {
  return {
    type: PLAYER_CALCULATE_NEXT,
    player,
    enemy
  };
}
