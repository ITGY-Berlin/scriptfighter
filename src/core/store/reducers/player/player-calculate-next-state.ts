import { createScriptAction } from '../../../utils/';
import { Finish, Player, PlayerState, ScriptAction } from '../../models';

export function playerCalculateNextState(player: Player, stun: number): PlayerState {
  if (stun > 0) {
    return 'STUN';
  }
  switch (player.state) {
    case 'STUN':
      return onStun(player);

    case 'BEFORE_ACTION':
      return onBeforeAction(player);

    case 'ACTION':
      return onAction(player);

    case 'AFTER_ACTION':
      return onAfterAction(player);

    case 'READY':
      return onReady(player);

    default:
      return player.state;
  }
}

export function playerCalculateFinish(player: Player, enemy: Player): Finish | null {
  if (player.finish === 'LOSE' || player.finish === 'WIN') {
    return player.finish;
  }
  if (enemy.finish === 'LOSE' && player.hp > 0) {
    return 'WIN';
  }
  if (player.hp <= 0) {
    return 'LOSE';
  }
  return null;
}
export function calculateNextAction(player: Player, state: PlayerState): ScriptAction {
  if (player.state !== 'READY') {
    return player.currentAction;
  }
  switch (state) {
    case 'ACTION': {
      if (player.currentAction.actionType === player.nextAction) {
        return player.currentAction;
      }
      return createScriptAction(player.nextAction);
    }

    case 'BEFORE_ACTION':
      return createScriptAction(player.nextAction);

    case 'READY': {
      if (player.currentAction.actionType !== 'idle') {
        return createScriptAction('idle');
      }
      return player.currentAction;
    }

    default:
      return player.currentAction;
  }
}

export function calculateActionStep(player: Player, state: PlayerState, stun: number): number {
  if (stun > 0) {
    return 0;
  }
  switch (state) {
    case 'BEFORE_ACTION':
    case 'AFTER_ACTION': {
      return player.currentActionStep + 1;
    }

    case 'ACTION': {
      const isCombo = calculateIsCombo(player);
      if (isCombo) {
        const recover = player.currentAction.recover;
        const delay = player.currentAction.delay;
        const combo = calculateCombo(player);
        if (recover - combo > 0) {
          return player.currentActionStep + combo + 1;
        }
        if (delay + recover - combo > 0) {
          return delay + recover - combo + 1;
        }
      }
      return player.currentActionStep + 1;
    }

    default:
      return 0;
  }
}

function calculateIsCombo(player: Player): boolean {
  if (player.currentAction.actionType === 'idle') {
    return false;
  }
  if (player.nextAction === 'idle') {
    return false;
  }
  if (player.currentAction.actionType === player.nextAction) {
    return true;
  }
  return false;
}

function calculateCombo(player: Player): number {
  if (calculateIsCombo(player)) {
    return player.currentAction.comboReduction;
  }
  return 0;
}

function onStun(player: Player): PlayerState {
  if (player.stun <= 0) {
    return 'READY';
  }
  return player.state;
}

function onBeforeAction(player: Player): PlayerState {
  const delay = player.currentAction.delay;
  const playerStep = player.currentActionStep;
  if (delay <= playerStep) {
    return 'ACTION';
  }
  return player.state;
}

function onAction(player: Player): PlayerState {
  const recover = player.currentAction.recover;
  const isCombo = calculateIsCombo(player);
  if (isCombo) {
    const delay = player.currentAction.delay;
    const combo = calculateCombo(player);
    if (recover - combo > 0) {
      return 'AFTER_ACTION';
    }
    if (delay + recover - combo > 0) {
      return 'BEFORE_ACTION';
    }
    return 'ACTION';
  }
  if (recover > 0) {
    return 'AFTER_ACTION';
  }
  return 'READY';
}

function onAfterAction(player: Player): PlayerState {
  const recoveryTime = calculateRecoveryTime(player);
  if (player.currentActionStep >= recoveryTime) {
    return 'READY';
  }
  return player.state;
}

function onReady(player: Player): PlayerState {
  if (player.nextAction === 'idle') {
    return 'READY';
  }

  const nextAction = createScriptAction(player.nextAction);
  if (nextAction.delay > 0) {
    return 'BEFORE_ACTION';
  }

  return 'ACTION';
}

function calculateRecoveryTime(player: Player): number {
  return player.currentAction.delay + player.currentAction.recover + 1;
}
