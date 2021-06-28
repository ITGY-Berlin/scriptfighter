import { PLAYGROUND_CALCULATE_NEXT, PLAYGROUND_RESET, PlaygroundActionTypes } from '../../actions';
import { Playground, PlaygroundState } from '../../models';
import { initialPlayers } from '../player/player.reducer';
import { initialPlayground, playgroundReducer } from './playground.reducer';

describe('Playground Reducer', () => {
  const playground = initialPlayground();
  it('should reset playground', () => {
    const manipulatedPlayground: Playground = { time: 5, winner: null, distance: 3, state: PlaygroundState.END };
    const action: PlaygroundActionTypes = { type: PLAYGROUND_RESET };

    const newState = playgroundReducer(manipulatedPlayground, action);
    expect(newState).toEqual(playground);
  });

  describe('calculate next', () => {
    it('should do nothing if already finished', () => {
      const manipulatedPlayground: Playground = { ...playground, state: PlaygroundState.END };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne,
        playerTwo
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState).toEqual(manipulatedPlayground);
    });

    it('should do nothing if already end with timeout', () => {
      const manipulatedPlayground: Playground = { ...playground, state: PlaygroundState.TIME_OUT };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne,
        playerTwo
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState).toEqual(manipulatedPlayground);
    });

    it('should update time if not finished', () => {
      const manipulatedPlayground: Playground = { ...playground };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne,
        playerTwo
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState.time).toBe(manipulatedPlayground.time - 1);
    });

    it('should set finished with Timeout if time is 0', () => {
      const manipulatedPlayground: Playground = { ...playground, time: 0 };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne,
        playerTwo
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState.state).toBe(PlaygroundState.TIME_OUT);
    });

    it('should set finished if player One is win', () => {
      const manipulatedPlayground: Playground = { ...playground };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne: { ...playerOne, finish: 'WIN' },
        playerTwo
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState.state).toBe(PlaygroundState.END);
      expect(newState.winner).toBe(action.playerOne);
    });

    it('should set finished if player Two is win', () => {
      const manipulatedPlayground: Playground = { ...playground };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne,
        playerTwo: { ...playerTwo, finish: 'WIN' }
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState.state).toBe(PlaygroundState.END);
      expect(newState.winner).toBe(action.playerTwo);
    });

    it('should set finished if player One is win with more hp on timer 0', () => {
      const manipulatedPlayground: Playground = { ...playground, time: 0 };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne,
        playerTwo: { ...playerTwo, hp: playerTwo.hp - 1 }
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState.state).toBe(PlaygroundState.TIME_OUT);
      expect(newState.winner).toBe(action.playerOne);
    });

    it('should set finished if player Two is win with more hp on timer 0', () => {
      const manipulatedPlayground: Playground = { ...playground, time: 0 };
      const [playerOne, playerTwo] = initialPlayers();
      const action: PlaygroundActionTypes = {
        type: PLAYGROUND_CALCULATE_NEXT,
        playerOne: { ...playerOne, hp: playerOne.hp - 1 },
        playerTwo
      };

      const newState = playgroundReducer(manipulatedPlayground, action);
      expect(newState.state).toBe(PlaygroundState.TIME_OUT);
      expect(newState.winner).toBe(action.playerTwo);
    });
  });
});
