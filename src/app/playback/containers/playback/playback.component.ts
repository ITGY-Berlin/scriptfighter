import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player, Playground } from '@scriptfighter/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PlaybackService } from '../../services/playback.service';
import { StateListItem } from '../../store/reducers/playback.reducer';

@Component({
  selector: 'sf-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss'],
})
export class PlaybackComponent implements OnInit, OnDestroy {
  isBusy$: Observable<boolean> | undefined;
  play$: Observable<boolean> | undefined;

  stateList: StateListItem[] | undefined;
  stateListIndex: number = 0;

  playground: Playground | undefined;
  playerOne: Player | undefined;
  playerTwo: Player | undefined;

  scrubberMax = 0;
  stageView = true;

  private isPlay = false;
  private ngDestroy$: Subject<void> = new Subject();
  private playIntervall$: Subject<void> = new Subject();

  constructor(private scriptPlayerService: PlaybackService) {}

  ngOnInit() {
    this.isBusy$ = this.scriptPlayerService.isPreparing$;
    this.play$ = this.scriptPlayerService.play$.pipe(
      takeUntil(this.ngDestroy$),
      tap((play) => {
        // distinct not work dont know why ???
        if (this.isPlay === play) {
          return;
        }
        this.isPlay = play;
        if (play) {
          this.play();
        } else {
          this.pause();
        }
      }),
    );

    this.scriptPlayerService.stateList$.pipe(takeUntil(this.ngDestroy$)).subscribe((list) => {
      this.stateListIndex = 0;
      this.stateList = list;
      this.scrubberMax = list.length - 1;
      this.setState(0);
    });

    this.scriptPlayerService.stateListIndex$.pipe(takeUntil(this.ngDestroy$)).subscribe((index) => {
      this.setState(index);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  onScrubb(position: number) {
    this.scriptPlayerService.setStateListIndex(position);
  }

  togglePlay(): void {
    this.scriptPlayerService.togglePlay();
  }

  reset(): void {
    this.scriptPlayerService.setStateListIndex(0);
    this.pause();
  }

  stepBack(): void {
    this.pause();
    if (this.stateListIndex! > 0) {
      this.scriptPlayerService.setStateListIndex(this.stateListIndex! - 1);
    }
  }

  stepFor(): void {
    this.pause();
    if (this.canStepForward()) {
      this.scriptPlayerService.setStateListIndex(this.stateListIndex! + 1);
    }
  }

  switchStage(): void {
    this.stageView = !this.stageView;
  }

  private play(): void {
    interval(150)
      .pipe(takeUntil(this.ngDestroy$), takeUntil(this.playIntervall$))
      .subscribe(() => {
        if (this.canStepForward()) {
          this.scriptPlayerService.setStateListIndex(this.stateListIndex! + 1);
        } else {
          this.scriptPlayerService.stop();
        }
      });
  }

  private pause(): void {
    this.playIntervall$.next();
    this.playIntervall$.complete();
    this.playIntervall$ = new Subject();
  }

  private setState(index: number) {
    this.stateListIndex = index;
    const { playground, players } = this.stateList![index];
    this.playground = playground;
    this.playerOne = players[0];
    this.playerTwo = players[1];
  }

  private unsubscribe(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private canStepForward(): boolean {
    return this.stateListIndex! < this.stateList!.length - 1;
  }
}
