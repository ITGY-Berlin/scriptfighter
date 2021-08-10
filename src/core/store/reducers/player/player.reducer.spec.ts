import {
  PlayerCalculateNextAction,
  PlayerResetAction,
  PlayerSetNameAction,
  PlayerSetNextActionAction,
  PLAYER_CALCULATE_NEXT,
  PLAYER_RESET,
  PLAYER_SET_ACTION,
  PLAYER_SET_NAME,
} from '../../actions';
import { Player, PlayerPosition, ScriptActionType } from '../../models';
import { initialPlayers, playerReducer } from './player.reducer';

describe('Player Reducer', () => {
  const [playerOne, playerTwo] = initialPlayers();

  describe('reset', () => {
    it('should reset player One', () => {
      const manipulatedPlayer: Player = { ...playerOne, stun: 4, nextAction: 'move_backward' };
      const action: PlayerResetAction = { type: PLAYER_RESET, player: 1 };

      const [p1, p2] = playerReducer([manipulatedPlayer, playerTwo], action);
      expect(p1).toEqual(playerOne);
    });

    it('should reset player Two', () => {
      const manipulatedPlayer: Player = { ...playerTwo, stun: 4, nextAction: 'move_backward' };
      const action: PlayerResetAction = { type: PLAYER_RESET, player: 2 };

      const [p1, p2] = playerReducer([playerOne, manipulatedPlayer], action);
      expect(p2).toEqual(playerTwo);
    });

    it('should not mainpulate player Two on reset player One', () => {
      const manipulatedPlayer: Player = { ...playerOne, stun: 4, nextAction: 'move_backward' };
      const action: PlayerResetAction = { type: PLAYER_RESET, player: 1 };

      const [p1, p2] = playerReducer([manipulatedPlayer, playerTwo], action);
      expect(p2).toEqual(playerTwo);
    });

    it('should not mainpulate player Two on reset player Two', () => {
      const manipulatedPlayer: Player = { ...playerTwo, stun: 4, nextAction: 'move_backward' };
      const action: PlayerResetAction = { type: PLAYER_RESET, player: 2 };

      const [p1, p2] = playerReducer([playerOne, manipulatedPlayer], action);
      expect(p1).toEqual(playerOne);
    });

    it('should not mainpulate player name', () => {
      const manipulatedPlayer: Player = { ...playerOne, name: 'new Name', nextAction: 'move_backward' };
      const action: PlayerResetAction = { type: PLAYER_RESET, player: 1 };

      const [p1, p2] = playerReducer([manipulatedPlayer, playerTwo], action);
      expect(p1.name).toEqual('new Name');
      expect(p1.nextAction).toEqual('idle');
    });

    it('should new position if in payload', () => {
      const position: PlayerPosition = { isLeft: true, positionX: 100, positionY: 40 };
      const action: PlayerResetAction = { type: PLAYER_RESET, player: 1, position };

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1.position).toEqual(position);
    });
  });

  describe('set Name', () => {
    function generatePayload(player: 1 | 2, name: string): PlayerSetNameAction {
      return { type: PLAYER_SET_NAME, player, name };
    }

    it('should set name on Player One', () => {
      const name = 'new Name';
      const action = generatePayload(1, name);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1.name).toEqual(name, 'player One name is not set');
      expect(p2.name).not.toEqual(name, 'player Two name should not set');
    });

    it('should set name on Player Two', () => {
      const name = 'new Name';
      const action = generatePayload(2, name);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p2.name).toEqual(name, 'player Two name is not set');
      expect(p1.name).not.toEqual(name, 'player One name should not set');
    });

    it('should set name to unname on name = null', () => {
      const name = null;
      const defaultName = playerOne.name;
      const action = generatePayload(1, name!);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1.name).toEqual(defaultName, 'player Two name is not set');
    });

    it('should set name to unname on empty string', () => {
      const name = '';
      const defaultName = playerOne.name;
      const action = generatePayload(1, name);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1.name).toEqual(defaultName, 'player Two name is not set');
    });
  });

  describe('set Action', () => {
    function generatePayload(player: 1 | 2, action: ScriptActionType): PlayerSetNextActionAction {
      return { type: PLAYER_SET_ACTION, player, action };
    }

    it('should set action on Player One', () => {
      const scriptAction: ScriptActionType = 'move_backward';
      const action = generatePayload(1, scriptAction);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1.nextAction).toEqual(scriptAction, 'player One action is not set');
      expect(p2.nextAction).not.toEqual(scriptAction, 'player Two action should not set');
    });

    it('should set action on Player Two', () => {
      const scriptAction: ScriptActionType = 'move_backward';
      const action = generatePayload(2, scriptAction);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p2.nextAction).toEqual(scriptAction, 'player Two action is not set');
      expect(p1.nextAction).not.toEqual(scriptAction, 'player One action should not set');
    });

    it('should do nothing on invalid action', () => {
      const scriptAction: ScriptActionType = 'my_action' as ScriptActionType;
      const defaultAction = playerOne.currentAction;
      const action = generatePayload(1, scriptAction);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1.currentAction).toEqual(defaultAction);
    });

    it('should do nothing on invalid action as null', () => {
      const scriptAction: ScriptActionType = null!;
      const defaultAction = playerOne.currentAction;
      const action = generatePayload(1, scriptAction);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1.currentAction).toEqual(defaultAction);
    });
  });

  describe('calculate next', () => {
    function generatePayload(player: 1 | 2, enemy: Player): PlayerCalculateNextAction {
      return { type: PLAYER_CALCULATE_NEXT, player, enemy };
    }

    it('should update change player One', () => {
      const changedPlayer: Player = { ...playerOne, nextAction: 'kick_hard' };
      const action = generatePayload(1, playerTwo);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p1).not.toEqual(changedPlayer);
      expect(p2).toEqual(playerTwo);
    });

    it('should update change player Two', () => {
      const changedPlayer: Player = { ...playerTwo, nextAction: 'kick_hard' };
      const action = generatePayload(2, playerTwo);

      const [p1, p2] = playerReducer([playerOne, playerTwo], action);
      expect(p2).not.toEqual(changedPlayer);
      expect(p1).toEqual(playerOne);
    });
  });
});
