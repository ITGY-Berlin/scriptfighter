export const workerTypescriptDefinition = `
declare type ScriptActionType =
  'idle' |
  'kick_hard' |
  'kick_light' |
  'punch_hard' |
  'punch_light' |
  'move_forward' |
  'move_backward' |
  'block' |
  'fire';

declare interface ScriptAction {
  readonly actionType: ScriptActionType;
  readonly damage: number;
  readonly armor: number;
  readonly range: number;
  readonly move: number; // moving when attack hits enemy, negativ number will move forward (not implemented)
  readonly recover: number; // recover time
  readonly delay: number; // delay until action begin
  readonly comboDelay: number; // delay when same attay is like before
  readonly stun: number; // stun when action hit the enemy
}

declare interface PlayerPosition {
  readonly isLeft: boolean;
  readonly positionX: number; // position from 0 (left) to 84 (right)
  readonly positionY: number; // will ignored first because there is no jump move
}

declare type Finish = 'WIN' | 'LOSE' | 'DRAW';

declare type PlayerState =
  'READY' |
  'STUN' |
  'BEFORE_ACTION' | // working with the action delay
  'ACTION' |
  'AFTER_ACTION'; // working with the recovery time

declare interface Player {
  readonly name: string;
  readonly hp: number;
  readonly stun: number;
  readonly position: PlayerPosition;
  readonly state: PlayerState;
  readonly finish: Finish;
  readonly currentAction: ScriptAction;
  readonly currentActionStep: number; // count the step already stays in same ActionState
  readonly nextAction: ScriptActionType;
}

declare interface Meta {
  readonly scriptActionTypes: ScriptActionType[];
  readonly actionMap: Map<ScriptActionType, ScriptAction>;
}

declare interface Playground {
  readonly time: number;
  readonly state: PlaygroundState;
  readonly winner?: Player | null; // null on draw
  readonly distance: number; // distance between the player
}
`;
