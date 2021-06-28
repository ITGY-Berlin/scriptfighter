import { calculateDistanceByPosition, isValidActionType } from '../../../utils';
import {
    PLAYER_CALCULATE_NEXT, PLAYER_RESET, PLAYER_SET_ACTION, PLAYER_SET_NAME, PlayerActionTypes,
    PlayerCalculateNextAction, PlayerResetAction, PlayerSetNameAction, PlayerSetNextActionAction
} from '../../actions';
import { Idle, Player, PlayerPosition } from '../../models';
import { playerCalculateNext } from './player-calculate-next';

export const playerOneDefaultPosition: PlayerPosition = {
  isLeft: true,
  positionX: 34,
  positionY: 0
};

export const playerTwoDefaultPosition: PlayerPosition = {
  isLeft: false,
  positionX: 50,
  positionY: 0
};

export const defaultDistance = calculateDistanceByPosition(playerOneDefaultPosition, playerTwoDefaultPosition);
const defaultName = 'unnamed';
const maxHP = 100;

function initialPlayer(position: PlayerPosition): Player {
  return {
    name: defaultName,
    hp: maxHP,
    position,
    state: 'READY',
    finish: null,
    stun: 0,
    currentAction: new Idle(),
    currentActionStep: 0,
    nextAction: 'idle',
  };
}

export function initialPlayers() {
  return [initialPlayer(playerOneDefaultPosition), initialPlayer(playerTwoDefaultPosition)];
}

export function playerReducer(currentState: Player[] = initialPlayers(), action: PlayerActionTypes): Player[] {
  if (!action.player) {
    return currentState;
  }

  switch (action.type) {
    case PLAYER_RESET:
      return reset(currentState, action);
    case PLAYER_SET_NAME:
      return setName(currentState, action);
    case PLAYER_SET_ACTION:
      return setNextAction(currentState, action);
    case PLAYER_CALCULATE_NEXT:
      return playerCalculateNextHelper(currentState, action);

    default: return currentState;
  }
}

function playerCalculateNextHelper([playerOne, playerTwo]: Player[], action: PlayerCalculateNextAction): Player[] {
  if (action.player === 1) {
    return [playerCalculateNext(playerOne, action), playerTwo];
  }
  return [playerOne, playerCalculateNext(playerTwo, action)];
}

function reset([playerOne, playerTwo]: Player[], action: PlayerResetAction): Player[] {
  const initialPositon = action.player === 1 ? playerOneDefaultPosition : playerTwoDefaultPosition;
  const position = action.position ? action.position : initialPositon;
  const newPlayer = initialPlayer(position);
  if (action.player === 1) {
    return [{ ...newPlayer, name: playerOne.name }, playerTwo];
  }
  return [playerOne, { ...newPlayer, name: playerTwo.name }];
}

function setName([playerOne, playerTwo]: Player[], action: PlayerSetNameAction): Player[] {
  const name = action.name ? action.name : defaultName;
  if (action.player === 1) {
    return [{ ...playerOne, name }, playerTwo];
  }
  return [playerOne, { ...playerTwo, name }];
}

function setNextAction([playerOne, playerTwo]: Player[], action: PlayerSetNextActionAction): Player[] {
  if (!isValidActionType(action.action)) {
    return [playerOne, playerTwo];
  }
  if (action.player === 1) {
    return [{ ...playerOne, nextAction: action.action }, playerTwo];
  }
  return [playerOne, { ...playerTwo, nextAction: action.action }];
}

