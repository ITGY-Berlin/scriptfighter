import {
    PLAYGROUND_CALCULATE_NEXT, PLAYGROUND_RESET, PlaygroundActionTypes,
    PlaygroundCalculateNextAction
} from '../../actions';
import { Player, Playground, PlaygroundState } from '../../models';
import { defaultDistance } from '../player/player.reducer';
import { calculateDistance } from '../../../utils';

export const startTime = 400;

export function initialPlayground(): Playground {
  return {
    distance: defaultDistance,
    time: startTime,
    state: PlaygroundState.FIGHTING
  };
}

export function playgroundReducer(currentState: Playground = initialPlayground(), action: PlaygroundActionTypes): Playground {
  switch (action.type) {
    case PLAYGROUND_RESET:
      return initialPlayground();
    case PLAYGROUND_CALCULATE_NEXT:
      return playgroundCalculateNext(currentState, action);

    default: return currentState;
  }
}

function playgroundCalculateNext(playground: Playground, action: PlaygroundCalculateNextAction): Playground {
  if (playground.state === PlaygroundState.FIGHTING) {
    const { playerOne, playerTwo } = action;
    const time = playground.time - 1;
    let winner = null;
    if (time <= 0) {
      winner = calculateWinnerOnTimeout(playerOne, playerTwo);
      return { ...playground, time, winner, state: PlaygroundState.TIME_OUT };
    }
    winner = calculateWinner(playerOne, playerTwo);
    if (winner) {
      return { ...playground, time, winner, state: PlaygroundState.END };
    }
    const isDraw = calculateDraw(playerOne, playerTwo);
    if (isDraw) {
      return { ...playground, time, state: PlaygroundState.END };
    }
    const distance = calculateDistance(playerOne, playerTwo);
    return { ...playground, distance, time };
  }
  return playground;
}

function calculateWinnerOnTimeout(playerOne: Player, playerTwo: Player): Player | null {
  const playerOneHP = playerOne.hp;
  const playerTwoHP = playerTwo.hp;
  if (playerOneHP > playerTwoHP) {
    return playerOne;
  }
  if (playerTwoHP > playerOneHP) {
    return playerTwo;
  }
  return null;
}

function calculateWinner(playerOne: Player, playerTwo: Player): Player | null {
  const playerOneWin = playerOne.finish === 'WIN';
  const playerTwoWin = playerTwo.finish === 'WIN';
  if (playerOneWin && !playerTwoWin) {
    return playerOne;
  }
  if (playerTwoWin && !playerOneWin) {
    return playerTwo;
  }
  return null;
}

function calculateDraw(playerOne: Player, playerTwo: Player): boolean {
  return playerOne.finish === 'LOSE' && playerTwo.finish === 'LOSE';
}
