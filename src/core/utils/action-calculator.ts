import {
    Player, PlayerPosition, PlayerState, ScriptAction, ScriptActionType, scriptActionTypes
} from '../store/models';

export function isValidActionType(action: string | ScriptActionType): boolean {
  return action ? scriptActionTypes.indexOf(action as ScriptActionType) >= 0 : false;
}

export function isMoveAction({ actionType }: ScriptAction): boolean {
  return actionType === 'move_forward' || actionType === 'move_backward';
}

export function isMoving(action: ScriptAction, state: PlayerState): boolean {
  return state === 'ACTION' && isMoveAction(action);
}

export function isAttackAction(action: ScriptAction): boolean {
  const { actionType } = action;
  return !isMoveAction(action) && actionType !== 'idle' && actionType !== 'block';
}

export function isAttacking(action: ScriptAction, state: PlayerState): boolean {
  return state === 'ACTION' && isAttackAction(action);
}

export function isBlocking({ actionType }: ScriptAction, state: PlayerState): boolean {
  return state === 'ACTION' && actionType === 'block';
}

export function isStuned(state: PlayerState): boolean {
  return state === 'STUN';
}

export function calculateDistance(player: Player, enemy: Player): number {
  return Math.abs(player.position.positionX - enemy.position.positionX);
}

export function calculateDistanceByPosition(playerPosition: PlayerPosition, enemyPosition: PlayerPosition): number {
  return Math.abs(playerPosition.positionX - enemyPosition.positionX);
}
