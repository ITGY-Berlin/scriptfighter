import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  initialPlayers,
  initialPlayground,
  Player,
  playerCalculateNext,
  playerReducer,
  Playground,
  playgroundCalculateNext,
  playgroundReducer,
} from '../../../core';

const defaultOptions = {
  theme: 'vs-light',
  language: 'json',
  tabSize: 2,
  fontSize: 12,
  lineNumbers: false,
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
};
const defaultOptionsOutput = {
  theme: 'vs-light',
  language: 'json',
  tabSize: 2,
  fontSize: 12,
  readOnly: true,
  lineNumbers: false,
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
};

@Component({
  selector: 'sf-engine-playground',
  templateUrl: './engine-playground.component.html',
  styleUrls: ['./engine-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnginePlaygroundComponent implements OnInit {
  // full list of options https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html#linenumbers
  editorOptions: any = defaultOptions;
  editorOptionsOutput: any = defaultOptionsOutput;

  playerground!: string;
  playerOne!: string;
  playerTwo!: string;

  playergroundNext!: string;
  playerOneNext!: string;
  playerTwoNext!: string;

  private _playerOne: Player;
  private _playerTwo: Player;
  private _playground: Playground;

  constructor() {
    this._playground = initialPlayground();
    const players = initialPlayers();
    this._playerOne = players[0];
    this._playerTwo = players[1];
  }

  ngOnInit() {
    this.playerground = JSON.stringify(this._playground, null, 2);
    this.playerOne = JSON.stringify(this._playerOne, null, 2);
    this.playerTwo = JSON.stringify(this._playerTwo, null, 2);
  }

  calculateNext() {
    const p1 = JSON.parse(this.playerOne);
    const p2 = JSON.parse(this.playerTwo);
    const playground = JSON.parse(this.playerground);
    const oldPlayers = [p1, p2];
    const p1Action = playerCalculateNext(p2, 1);
    const p2Action = playerCalculateNext(p1, 2);
    let players = playerReducer(oldPlayers, p1Action);
    players = playerReducer(players, p2Action);
    const playgroundAction = playgroundCalculateNext(players);
    const newPlayeground = playgroundReducer(playground, playgroundAction);

    this.playerOneNext = JSON.stringify(players[0], null, 2);
    this.playerTwoNext = JSON.stringify(players[1], null, 2);
    this.playergroundNext = JSON.stringify(newPlayeground, null, 2);
  }
}
