import { animate, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { PlayerAnimationClass } from 'src/core';

/**
 * 632 width of the screen look at (.fighter-canvas) width
 * 150 width of the fighter
 * 84 max of playground space
 */
const moveScaleFactor = (632 - 150) / 84;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sf-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss'],
  animations: [
    trigger('animating', [
      transition('* => stun', [animate('0.3s')]),
      transition('* => block', [animate('0.3s')]),
      transition('* => fire', [animate('0.7s')]),
      transition('* => kick_hard', [animate('0.5s')]),
      transition('* => kick_light', [animate('0.3s')]),
      transition('* => punch_hard', [animate('0.5s')]),
      transition('* => punch_light', [animate('0.3s')]),
      transition('* => move_forward', [animate('0.3s')]),
      transition('* => move_backward', [animate('0.3s')]),
    ]),
  ],
})
export class FighterComponent {
  @HostBinding('style.transform') bindedScale = null;
  @Input() @HostBinding('class.two') isFighterTwo = false;
  @Input() @HostBinding('class.flip') flip = false;

  @Input()
  set action(action: PlayerAnimationClass | string | null) {
    this._action = action;
  }
  get action(): PlayerAnimationClass | string | null {
    return this._action;
  }

  @Input()
  @HostBinding('style.left.px')
  set position(position: number) {
    this._position = Math.floor(position * moveScaleFactor);
  }
  get position() {
    return this._position;
  }

  @Output() actionChange = new EventEmitter<string | null>();

  private _action: PlayerAnimationClass | string | null = null;
  private _position = 0;

  constructor() {}

  onAnimationEnd() {
    if (this._action === 'win' || this._action === 'lose' || this._action === 'draw') {
      return;
    }
    this._action = null;
    this.actionChange.emit(this._action);
  }
}
