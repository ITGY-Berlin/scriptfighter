import { Player } from '../models';
import {
    PLAYGROUND_CALCULATE_NEXT, PLAYGROUND_RESET, PlaygroundActionTypes
} from './playground.type';

export function playgroundReset(): PlaygroundActionTypes {
  return {
    type: PLAYGROUND_RESET
  };
}

export function playgroundCalculateNext([playerOne, playerTwo]: Player[]): PlaygroundActionTypes {
  return {
    type: PLAYGROUND_CALCULATE_NEXT,
    playerOne,
    playerTwo
  };
}
