import { PLAYER_CALCULATE_NEXT, PlayerCalculateNextAction } from '../../actions';
import { Player, PlayerState, KickHard, ScriptActionType } from '../../models';
import { playerCalculateNext } from './player-calculate-next';
import { initialPlayers } from './player.reducer';
import { createScriptAction } from '../../../utils';

describe('player calculate next', () => {
  const [playerOne, playerTwo] = initialPlayers();

  /**
   * this is a helper function to calculate the next player with the same action and a given ticks
   * how often the calculateNext should be called
   * @param player prepared Player
   * @param action next action
   * @param ticks tickes to call with the same action
   */
  function playerCalculateNextHelper(player: Player, action: PlayerCalculateNextAction, ticks: number): Player {
    let newPlayer: Player = player;
    for (let i = 0; i < ticks; i++) {
      newPlayer = playerCalculateNext(newPlayer, action);
    }
    return newPlayer;
  }

  function resetNextAction(player: Player, nextAction: ScriptActionType): Player {
    return {...player, nextAction};
  }

  function generateActionEnemy(enemy: Player, action: ScriptActionType, state: PlayerState): Player {
    const currentAction = createScriptAction(action);
    return {...playerTwo, currentAction, state };
  }

  /**
   * the other properties will ingored by the function playerCalculateNext
   * just enemy is used
   * @param enemy the enemy Player
   */
  function generatePayload(enemy: Player): PlayerCalculateNextAction {
    return { type: PLAYER_CALCULATE_NEXT, player: 1, enemy };
  }

  it('should be possible to move forward', () => {
    const action = generatePayload(playerTwo);
    const preparedPlayer: Player = { ...playerOne, nextAction: 'move_forward' };
    const startPosition = preparedPlayer.position.positionX;

    let newState = playerCalculateNext(preparedPlayer, action);
    expect(newState.currentAction.actionType).toBe('move_forward');
    expect(newState.position.positionX).toBe(startPosition);

    newState = playerCalculateNextHelper(newState, action, 2);
    expect(newState.position.positionX).toBe(startPosition + 2);
  });

  it('should be possible to move backward', () => {
    const action = generatePayload(playerTwo);
    const preparedPlayer: Player = { ...playerOne, nextAction: 'move_backward' };
    const startPosition = preparedPlayer.position.positionX;

    let newState = playerCalculateNext(preparedPlayer, action);
    expect(newState.currentAction.actionType).toBe('move_backward');
    expect(newState.position.positionX).toBe(startPosition);

    newState = playerCalculateNextHelper(newState, action, 2);
    expect(newState.position.positionX).toBe(startPosition - 2);
  });

  it('should not be possible to move backward outside the area', () => {
    const action = generatePayload(playerTwo);
    const preparedPlayer: Player = { ...playerOne, nextAction: 'move_backward' };

    const newState = playerCalculateNextHelper(preparedPlayer, action, 1000);
    expect(newState.position.positionX).toBe(0);
  });

  it('should calculate the KICK HARD right', () => {
    const action = generatePayload(playerTwo);
    const preparedPlayer: Player = { ...playerOne, nextAction: 'kick_hard' };
    const KICK_HARD = new KickHard();

    let newState = playerCalculateNext(preparedPlayer, action);
    expect(newState.currentAction.actionType).toBe('kick_hard');
    expect(newState.state).toBe('BEFORE_ACTION');

    newState = resetNextAction(newState, 'idle');
    newState = playerCalculateNextHelper(newState, action, KICK_HARD.delay);
    expect(newState.state).toBe('ACTION');

    newState = playerCalculateNext(newState, action);
    expect(newState.state).toBe('AFTER_ACTION');

    newState = playerCalculateNextHelper(newState, action, KICK_HARD.recover);
    expect(newState.state).toBe('READY');
  });

  it('should stuned if hiddet by enmey', () => {
    const enemy = generateActionEnemy(playerTwo, 'punch_light', 'ACTION');
    const action = generatePayload(enemy);
    const position = {...playerTwo.position, positionX: playerTwo.position.positionX - 1}; // position next to player two
    const preparedPlayer: Player = { ...playerOne, position, nextAction: 'kick_hard' };

    const newState = playerCalculateNext(preparedPlayer, action);
    expect(newState.state).toBe('STUN');
  });
});
