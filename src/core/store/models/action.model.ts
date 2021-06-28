export type ScriptActionType =
  'idle' |
  'kick_hard' |
  'kick_light' |
  'punch_hard' |
  'punch_light' |
  'move_forward' |
  'move_backward' |
  'block' |
  'fire' |
  'stun';

/** this is for typecheck while runtime */
export const scriptActionTypes: ScriptActionType[] = [
  'idle' ,
  'kick_hard' ,
  'kick_light' ,
  'punch_hard' ,
  'punch_light' ,
  'move_forward' ,
  'move_backward' ,
  'block' ,
  'fire' ,
  'stun'
];

export interface ScriptAction {
  readonly actionType: ScriptActionType;
  readonly damage: number;
  readonly armor: number;
  readonly range: number;
  readonly move: number; // moving when attack hits enemy, negativ number will move forward (not implemented)
  readonly recover: number; // recover time
  readonly delay: number; // delay until action begin
  readonly comboReduction: number; // reduce delay when same attack is like before
  readonly stun: number; // stun when action hit the enemy
}

/**
 * definitions of the Action
 */
export class Idle implements ScriptAction {
  readonly actionType = 'idle';
  readonly damage = 0;
  readonly armor = 0;
  readonly range = 0;
  readonly move = 0;
  readonly recover = 0;
  readonly delay = 0;
  readonly comboReduction = 0;
  readonly stun = 0;
}

export class KickHard implements ScriptAction {
  readonly actionType = 'kick_hard';
  readonly damage = 20;
  readonly armor = 0;
  readonly range = 8;
  readonly move = 0;
  readonly recover = 2;
  readonly delay = 5;
  readonly comboReduction = 1;
  readonly stun = 2;
}

export class KickLight implements ScriptAction {
  readonly actionType = 'kick_light';
  readonly damage = 6;
  readonly armor = 4;
  readonly range = 6;
  readonly move = 0;
  readonly recover = 3;
  readonly delay = 1;
  readonly comboReduction = 1;
  readonly stun = 1;
}

export class PunchHard implements ScriptAction {
  readonly actionType = 'punch_hard';
  readonly damage = 10;
  readonly armor = 0;
  readonly range = 6;
  readonly move = 0;
  readonly recover = 2;
  readonly delay = 1;
  readonly comboReduction = 1;
  readonly stun = 2;
}

export class PunchLight implements ScriptAction {
  readonly actionType = 'punch_light';
  readonly damage = 4;
  readonly armor = 4;
  readonly range = 4;
  readonly move = 0;
  readonly recover = 2;
  readonly delay = 1;
  readonly comboReduction = 0;
  readonly stun = 1;
}

export class MoveForward implements ScriptAction {
  readonly actionType = 'move_forward';
  readonly damage = 0;
  readonly armor = 2;
  readonly range = 0;
  readonly move = 0;
  readonly recover = 0;
  readonly delay = 1;
  readonly comboReduction = 1;
  readonly stun = 0;
}

export class MoveBackward implements ScriptAction {
  readonly actionType = 'move_backward';
  readonly damage = 0;
  readonly armor = 2;
  readonly range = 0;
  readonly move = 0;
  readonly recover = 0;
  readonly delay = 1;
  readonly comboReduction = 1;
  readonly stun = 0;
}

export class Block implements ScriptAction {
  readonly actionType = 'block';
  readonly damage = 0;
  readonly armor = 16;
  readonly range = 0;
  readonly move = 0;
  readonly recover = 0;
  readonly delay = 1;
  readonly comboReduction = 1;
  readonly stun = 0;
}

export class Fire implements ScriptAction {
  readonly actionType = 'fire';
  readonly damage = 18;
  readonly armor = 0;
  readonly range = 20;
  readonly move = 0;
  readonly recover = 3;
  readonly delay = 4;
  readonly comboReduction = 1;
  readonly stun = 1;
}
