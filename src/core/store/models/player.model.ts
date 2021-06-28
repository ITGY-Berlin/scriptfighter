import { ScriptAction, ScriptActionType } from './action.model';

export interface PlayerPosition {
  readonly isLeft: boolean;
  readonly positionX: number; // position from 0 (left) to 84 (right)
  readonly positionY: number; // will ignored first because there is no jump move
}

export type Finish = 'WIN' | 'LOSE' | 'DRAW';

export type PlayerState =
  | 'READY'
  | 'STUN'
  | 'BEFORE_ACTION' // working with the action delay
  | 'ACTION'
  | 'AFTER_ACTION'; // working with the recovery time

export interface Player {
  readonly name: string;
  readonly hp: number;
  readonly stun: number;
  readonly position: PlayerPosition;
  readonly state: PlayerState;
  readonly finish: Finish | null;
  readonly currentAction: ScriptAction;
  readonly currentActionStep: number; // count the step already stays in same ActionState
  readonly nextAction: ScriptActionType;
}
