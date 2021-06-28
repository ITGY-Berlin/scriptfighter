import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

type StageType = 1 | 2 | 3;

@Component({
  selector: 'sf-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {
  @Input() stage: StageType = 2;

  get videoSrc(): string {
    return `./assets/img/stage${this.stage}.mp4`;
  }

  get poster(): string {
    return `./assets/img/stage${this.stage}.gif`;
  }
}
