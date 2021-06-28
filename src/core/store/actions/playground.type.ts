import { Player } from '../models';

export const PLAYGROUND_RESET = 'PLAYGROUND_RESET';
export const PLAYGROUND_CALCULATE_NEXT = 'PLAYGROUND_CALCULATE_NEXT';

export interface PlaygroundResetAction {
  readonly type: typeof PLAYGROUND_RESET;
}

export interface PlaygroundCalculateNextAction {
  readonly type: typeof PLAYGROUND_CALCULATE_NEXT;
  readonly playerOne: Player;
  readonly playerTwo: Player;
}

export type PlaygroundActionTypes = PlaygroundCalculateNextAction | PlaygroundResetAction;
