import { Player, ScriptActionType } from '../store/models';

export type PlayerAnimationClass = ScriptActionType | 'stun' | 'win' | 'lose' | 'draw';

export function playerAnimationClass(player: Player | undefined): PlayerAnimationClass | null {
  if (!player) {
    return null;
  }
  if (player.finish) {
    switch (player.finish) {
      case 'LOSE':
        return 'lose';
      case 'WIN':
        return 'win';
      case 'DRAW':
        return 'draw';
    }
  }
  switch (player.state) {
    case 'STUN':
      return 'stun';
    case 'ACTION':
      return player.currentAction.actionType;

    default:
      return null;
  }
}
