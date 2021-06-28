import { WorkerCommand, WorkerCommandType, workerDefault } from '../defaults';
import { Player, Playground, scriptActionTypes } from '../store/models';
import { actionMap } from './action-state.factory';

function createWorkerHelper(script: string): Worker | null {
  if (!script) {
    return null;
  }
  const blob = new Blob([workerDefault + script], {
    type: 'application/javascript'
  });
  return new Worker(URL.createObjectURL(blob));
}

export function createWorker(code: string): Worker | null {
  try {
    const worker = createWorkerHelper(code);
    return worker;
  } catch (e) {
    console.error('Invalid Code, compiling failed', e);
  }
  return null;
}

export function removeWorker(worker: Worker | null) {
  if (worker) {
    worker.terminate();
  }
}

export function createWorkerCommand(
  player: 1 | 2,
  world: Playground,
  players: Player[],
  cmd: WorkerCommandType = 'calculateNextMove'
): WorkerCommand {
  const me = player === 1 ? players[0] : players[1];
  const enemy = player === 1 ? players[1] : players[0];

  const meta = {
    scriptActionTypes,
    actionMap
  }

  return { cmd, me, enemy, world, meta };
}
