import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Player, playerAnimationClass, Playground, PlaygroundState } from '@scriptfighter/core';

function canIgnoreClass(className: string | null): boolean {
  return !className || className === 'lose' || className === 'win' || className === 'draw';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sf-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
})
export class StageComponent {
  @Input() playMode: boolean | null = false;
  @Input() scale: number | null = null;

  @Input()
  set playground(playground: Playground | undefined) {
    this._playground = playground;
    if (this.isDraw) {
      this._playerOneAnimation = 'draw';
      this._playerTwoAnimation = 'draw';
    }
  }
  get playground(): Playground | undefined {
    return this._playground;
  }

  @Input()
  set playerOne(playerOne: Player | undefined) {
    this._playerOne = playerOne;
    if (this.isDraw) {
      return;
    }
    if (canIgnoreClass(this._playerOneAnimation)) {
      this._playerOneAnimation = playerAnimationClass(playerOne);
    } else {
      this._playerOneAnimationNext = playerAnimationClass(playerOne);
    }
  }
  get playerOne(): Player | undefined {
    return this._playerOne;
  }

  @Input()
  set playerTwo(playerTwo: Player | undefined) {
    this._playerTwo = playerTwo;
    if (this.isDraw) {
      return;
    }
    if (canIgnoreClass(this._playerTwoAnimation)) {
      this._playerTwoAnimation = playerAnimationClass(playerTwo);
    } else {
      this._playerTwoAnimationNext = playerAnimationClass(playerTwo);
    }
  }
  get playerTwo(): Player | undefined {
    return this._playerTwo;
  }

  set playerOneAnimation(animation: string | null) {
    if (animation && this._playerOneAnimation) {
      return;
    }
    this._playerOneAnimation = animation;
  }
  get playerOneAnimation(): string | null {
    if (!this._playerOneAnimation && this._playerOneAnimationNext) {
      this._playerOneAnimation = this._playerOneAnimationNext;
      this._playerOneAnimationNext = null;
    }
    return this._playerOneAnimation;
  }

  set playerTwoAnimation(animation: string | null) {
    if (animation && this._playerTwoAnimation) {
      return;
    }
    this._playerTwoAnimation = animation;
  }
  get playerTwoAnimation(): string | null {
    if (!this._playerTwoAnimation && this._playerTwoAnimationNext) {
      this._playerTwoAnimation = this._playerTwoAnimationNext;
      this._playerTwoAnimationNext = null;
    }
    return this._playerTwoAnimation;
  }

  get isReady(): boolean {
    return !!this._playerOne && !!this._playerTwo;
  }

  get transform(): string | null {
    if (!this.scale) {
      return null;
    }
    return `scale3d(${this.scale},${this.scale},${this.scale})`;
  }

  get isDraw() {
    return this._playground && this._playground.state === PlaygroundState.TIME_OUT && !this._playground.winner;
  }

  private _playerOneAnimation: string | null = null;
  private _playerOneAnimationNext: string | null = null;
  private _playerTwoAnimation: string | null = null;
  private _playerTwoAnimationNext: string | null = null;
  private _playerOne: Player | undefined;
  private _playerTwo: Player | undefined;
  private _playground: Playground | undefined;
}
