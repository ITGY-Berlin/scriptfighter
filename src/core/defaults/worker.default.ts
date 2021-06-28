import { Player, Playground, ScriptAction, ScriptActionType } from '../store/models';

export type WorkerCommandType = 'init' | 'calculateNextMove';
export interface WorkerCommand {
  cmd: WorkerCommandType;
  me: Player;
  enemy: Player;
  world: Playground;
  meta: {
    scriptActionTypes: ScriptActionType[];
    actionMap: Map<ScriptActionType, ScriptAction>;
  };
}

export const workerDefault = `
  self.addEventListener('message', function(e) {

    const data = e.data;
    const world = data.world;
    const me = data.me;
    const enemy = data.enemy;
    const meta = data.meta;
    let action;

    switch (data.cmd) {
      case 'calculateNextMove':
        action = calculateNextMove(world, me, enemy);
        self.postMessage({cmd:'calculateNextMove', action: action});
        break;
      case 'init':
        action = init(world, me, enemy, meta);
        self.postMessage({cmd:'init', action: action});
        break;
      default:
        self.postMessage('Unknown command');
    };

  }, false);
`;
