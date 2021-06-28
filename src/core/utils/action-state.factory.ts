import {
    Block, Fire, Idle, KickHard, KickLight, MoveBackward, MoveForward, PunchHard, PunchLight,
    ScriptAction, ScriptActionType, scriptActionTypes
} from '../store/models';

export const defaultAction = new Idle();

// map string/action to the stats
// example PUNCH_HARD => {name: PUNCH_HARD, delay: ....}
export const actionMap = new Map<ScriptActionType, ScriptAction>([
  ['block', new Block()],
  ['idle', new Idle()],
  ['kick_hard', new KickHard()],
  ['kick_light', new KickLight()],
  ['punch_hard', new PunchHard()],
  ['punch_light', new PunchLight()],
  ['fire', new Fire()],
  ['move_forward', new MoveForward()],
  ['move_backward', new MoveBackward()],
]);

export function createScriptAction(action: string | ScriptActionType): ScriptAction {
  const actionType = parseActionType(action);
  const actionFound: ScriptAction = actionMap.get(actionType)!;
  return { ...actionFound };
}

function parseActionType(actionType: string | ScriptActionType): ScriptActionType {
  if (scriptActionTypes.indexOf(actionType as ScriptActionType) > 0) {
    return actionType as ScriptActionType;
  }
  const synthesizedInput = typeof actionType === 'string' ? actionType.trim().toLocaleLowerCase() : null;
  if (synthesizedInput && scriptActionTypes.indexOf(synthesizedInput as ScriptActionType)) {
    return synthesizedInput as ScriptActionType;
  }

  // return idle if wrong action
  return 'idle';
}
