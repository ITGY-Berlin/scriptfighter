import { calculateDistance, isAttacking, isBlocking, isMoving } from '../../../utils/';
import { PlayerCalculateNextAction } from '../../actions';
import { MoveBackward, Player, PlayerPosition, ScriptAction, PlayerState } from '../../models';
import {
    calculateActionStep, calculateNextAction, playerCalculateNextState, playerCalculateFinish
} from './player-calculate-next-state';

/** helper enum for calculation */
type FighterState = 'idle' | 'attacking' | 'moving' | 'stun';

export const maxPositionX = 84;
export const minPositionX = 0;

export function playerCalculateNext(player: Player, action: PlayerCalculateNextAction): Player {
  const { enemy } = action;
  const stun = calculateStun(player, enemy);
  const finish = playerCalculateFinish(player, enemy);
  const state = playerCalculateNextState(player, stun);
  const nextAction = calculateNextAction(player, state);
  const position = calculatePosition(player, nextAction, state, enemy);
  const hp = calculateHp(player, nextAction, player.state, enemy);
  const currentActionStep = calculateActionStep(player, state, stun);
  return { ...player, position, hp, stun, state, finish, currentActionStep, currentAction: nextAction };
}

/**
 * calculates the new Position of the player in relation to enemy and players movement
 * @param player Player
 * @param enemy Player
 */
function calculatePosition(player: Player, nextAction: ScriptAction, state: PlayerState, enemy: Player): PlayerPosition {
  if (!isMoving(nextAction, state)) {
    return player.position;
  }

  let fighterTwo: FighterState = 'idle';
  fighterTwo = isMoving(enemy.currentAction, enemy.state) ? 'moving' : fighterTwo;
  fighterTwo = isAttacking(enemy.currentAction, enemy.state) ? 'attacking' : fighterTwo;

  switch (fighterTwo) {
    // both player are moving
    case ('moving'): {
      return calculatePositionMovingBoth(player, enemy);
    }
    // playerOne is moving while playerTwo is attacking
    case ('attacking'): {
      return calculatePositionMovingWhileAttacking(player, enemy);
    }
    // playerOne is maybe pushing PlayerTwo to corner
    case ('idle'): {
      return calculatePositionMovingWhileIdle(player, enemy);
    }
    default: return player.position;
  }
}

/**
 * calculate the player hp in relation to the enemys action
 * @param player Player
 * @param enemy Player
 */
function calculateHp(player: Player, nextAction: ScriptAction, state: PlayerState, enemy: Player): number {
  const enemyIsAttacking = isAttacking(enemy.currentAction, enemy.state);
  const distance = calculateDistance(player, enemy);

  if (enemyIsAttacking && distance <= enemy.currentAction.range) {
    const playerIsBlocking = isBlocking(nextAction, state);
    let damage = enemy.currentAction.damage;
    if (playerIsBlocking) {
      damage = Math.max(enemy.currentAction.damage - player.currentAction.armor, 0);
    }
    return Math.max(player.hp - damage, 0);
  }

  return player.hp;
}

/**
 * calculate the player stun in relation to enemys action
 * @param player Player
 * @param enemy Player
 */
function calculateStun(player: Player, enemy: Player): number {
  const enemyIsAttacking = isAttacking(enemy.currentAction, enemy.state);
  const distance = calculateDistance(player, enemy);

  /** if player hitted by enemy */
  if (enemyIsAttacking && distance <= enemy.currentAction.range) {
    const playerIsBlocking = isBlocking(player.currentAction, player.state);
    /** on block is no stun */
    if (playerIsBlocking) {
      return 0;
    }
    return enemy.currentAction.stun;
  }

  /** if player is already stuned it will reduce */
  if (player.stun > 0) {
    return player.stun - 1;
  }

  return 0;
}

/**
 * Helper function to calculate the Player position
 * @param player Player
 * @param enemy Player
 */
function calculatePositionMovingWhileAttacking(player: Player, enemy: Player): PlayerPosition {
  const distance = calculateDistance(player, enemy);

  // can make move because other player is not hitting
  if (enemy.currentAction.range < distance) {
    const newPosition = calculateNextPositon(player.position, enemy.currentAction);

    // check if the new position is not the same of the other player
    if (newPosition.positionX !== enemy.position.positionX) {
      return newPosition;
    }
  }

  return player.position;
}

/**
 * Helper function to calculate the Player position
 * @param player Player
 * @param enemy Player
 */
function calculatePositionMovingBoth(player: Player, enemy: Player): PlayerPosition {
  const playerOneNextPosition = calculateNextPositon(player.position, player.currentAction);
  const playerTwoNextPosition = calculateNextPositon(enemy.position, enemy.currentAction);

  // collistion because both player move to same position or both pushing to each other -> reset both
  // the >= operator is a hack because currently it is not posible to switch the sites
  if (playerOneNextPosition.isLeft) {
    if (playerOneNextPosition.positionX >= playerTwoNextPosition.positionX) {
      return player.position;
    }
  } else {
    if (playerTwoNextPosition.positionX >= playerOneNextPosition.positionX) {
      return player.position;
    }
  }

  return playerOneNextPosition;
}

/**
 * Helper function to calculate the Player position
 * @param player Player
 * @param enemy Player
 */
function calculatePositionMovingWhileIdle(player: Player, enemy: Player): PlayerPosition {
  const distance = calculateDistance(player, enemy);

  if (distance <= 1 && player.currentAction.actionType === 'move_forward') {
    const playerPostion = calculateNextPositon(player.position, player.currentAction);
    const enemyPostion = calculateNextPositon(enemy.position, new MoveBackward());

    // if both get same position (start or end position)
    if (playerPostion.positionX === enemyPostion.positionX) {
      return player.position;
    }

    return playerPostion;
  }
  return calculateNextPositon(player.position, player.currentAction);
}

/**
 * Helperfunction to calculate the next PlayerPosition
 * @param position PlayerPosition
 * @param param1 ActionState
 */
function calculateNextPositon(position: PlayerPosition, { actionType }: ScriptAction): PlayerPosition {
  let positionX = position.positionX;
  if (actionType === 'move_forward') {
    if (position.isLeft) {
      positionX++;
    } else {
      positionX--;
    }
  } else if (actionType === 'move_backward') {
    if (position.isLeft) {
      positionX--;
    } else {
      positionX++;
    }
  }
  positionX = Math.min(Math.max(positionX, minPositionX), maxPositionX);
  return { ...position, positionX };
}
