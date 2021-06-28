import { Player } from './player.model';

export enum PlaygroundState {
  FIGHTING = 'FIGHTING',
  TIME_OUT = 'TIME_OUT',
  END = 'END',
}

export interface Playground {
  readonly time: number;
  readonly state: PlaygroundState;
  readonly winner?: Player | null; // null on draw
  readonly distance: number; // distance between the player
}
