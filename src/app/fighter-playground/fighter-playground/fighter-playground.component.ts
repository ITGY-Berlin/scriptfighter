import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Player, Playground, initialPlayground, initialPlayers, createScriptAction } from '../../../core';

@Component({
  selector: 'sf-fighter-playground',
  templateUrl: './fighter-playground.component.html',
  styleUrls: ['./fighter-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FighterPlaygroundComponent implements OnInit {

  playerOne: Player;
  playerTwo: Player;
  playground: Playground;

  scale = 1;

  constructor() {
    this.playground = initialPlayground();
    const players = initialPlayers();
    this.playerOne = players[0];
    this.playerTwo = players[1];
  }

  ngOnInit() {
  }

  action(action: string) {
    const currentAction = createScriptAction(action);
    this.playerOne = {...this.playerOne, state: 'ACTION', currentAction };
  }

  scaleUp() {
    this.scale += 0.1;
  }

  scaleDown() {
    this.scale -= 0.1;
  }

}
