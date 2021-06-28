export const playerCodeDefault = `/**
 * calculation of the next action
 * @param {Playground} world
 * @param {Player} me
 * @param {Player} enemy
 * @return {ScriptActionType} action
 */
function calculateNextMove(world, me, enemy) {
  return 'kick_hard';
}

//memory to store data and get access every cycle
const memory = {};

/**
 * will only called ones at the beginning of the fight
 * can be used to prepare variables
 * @param {Playground} world
 * @param {Player} me
 * @param {Player} enemy
 * @param {Meta} meta
 * @return {ScriptActionType} action
 */
function init(world, me, enemy, meta) {
  return 'idle';
}
`;
