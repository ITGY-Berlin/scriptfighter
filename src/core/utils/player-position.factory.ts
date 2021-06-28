import { PlayerPosition } from '../store/models';

const maxPostionX = 84;

export function createPosition(isLeft: boolean, positionX: number, positionY: number): PlayerPosition {
  positionX = Math.min(Math.max(positionX, 0), maxPostionX);
  return { isLeft, positionX, positionY };
}

export function clonePosition(position: PlayerPosition): PlayerPosition {
  return { ...position };
}
