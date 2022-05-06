import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, race, timer } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  createWorkerCommand,
  initialPlayers,
  initialPlayground,
  playerCalculateNext,
  playerReducer,
  playerSetAction,
  playerSetName,
  playgroundCalculateNext,
  playgroundReducer,
  PlaygroundState,
  ScriptActionType,
  startTime,
  WorkerCommandType,
} from '../../../../core';
import { CodeService } from '../../../shared/services/code.service';
import { selectCode } from '../../../shared/store/selectors/code.selectors';
import { playbackCalculateBegin, playbackCalculateFinished } from '../actions/playback.actions';
import { StateListItem } from '../reducers/playback.reducer';

const computeTime = 500;

@Injectable()
export class PlaybackEffects {
  calculate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playbackCalculateBegin),
      withLatestFrom(this.store.select(selectCode)),
      switchMap(([action, code]) => {
        const initialState = this.generateInitialState(code.fighterOneName, code.fighterTwoName);
        const stateList: StateListItem[] = [initialState];
        return this.culaculationEngine$(initialState).pipe(
          tap((item) => {
            stateList.push(item);
          }),
          filter(({ playground }) => playground.state !== PlaygroundState.FIGHTING),
          map(() => stateList),
        );
      }),
      map((stateList) => {
        return playbackCalculateFinished({ payload: { stateList } });
      }),
    ),
  );

  private culaculationEngine$(initialState: StateListItem): Observable<StateListItem> {
    const calcSub = new BehaviorSubject<StateListItem>(initialState);

    return calcSub.pipe(
      switchMap(({ playground, players }) => {
        let cmd: WorkerCommandType = 'calculateNextMove';
        if (playground.time === startTime) {
          cmd = 'init';
        }
        const p1cmd = createWorkerCommand(1, playground, players, cmd);
        const p2cmd = createWorkerCommand(2, playground, players, cmd);
        const raceObserable = combineLatest([
          of(playground),
          of(players),
          race<[ScriptActionType, ScriptActionType]>(
            timer(computeTime).pipe(map(() => 'idle')),
            this.codeService.message$(1).pipe(map((data) => data.data.action)),
          ),
          race<[ScriptActionType, ScriptActionType]>(
            timer(computeTime).pipe(map(() => 'idle')),
            this.codeService.message$(2).pipe(map((data) => data.data.action)),
          ),
        ]);
        this.codeService.executeCode(1, p1cmd);
        this.codeService.executeCode(2, p2cmd);
        return raceObserable;
      }),
      map(([playground, players, a1, a2]) => {
        const [p1, p2] = players;
        let p1Action = playerSetAction(a1 as ScriptActionType, 1);
        let p2Action = playerSetAction(a2 as ScriptActionType, 2);
        let newPlayers = playerReducer(players, p1Action);
        newPlayers = playerReducer(newPlayers, p2Action);
        p1Action = playerCalculateNext(p2, 1);
        p2Action = playerCalculateNext(p1, 2);
        newPlayers = playerReducer(newPlayers, p1Action);
        newPlayers = playerReducer(newPlayers, p2Action);
        const playgroundAction = playgroundCalculateNext(newPlayers);
        const newPlayeground = playgroundReducer(playground, playgroundAction);
        return { playground: newPlayeground, players: newPlayers };
      }),
      tap((item) => {
        const { playground } = item;
        if (playground && playground.state === PlaygroundState.FIGHTING) {
          calcSub.next(item);
        } else {
          calcSub.complete();
        }
      }),
    );
  }

  private generateInitialState(fighterOneName: string, fighterTwoName: string): StateListItem {
    let players = initialPlayers();
    // replace name of first player if needed
    if (fighterOneName) {
      const p1Action = playerSetName(fighterOneName, 1);
      players = playerReducer(players, p1Action);
    }
    // replace name of second player if needed
    if (fighterTwoName) {
      const p2Action = playerSetName(fighterTwoName, 2);
      players = playerReducer(players, p2Action);
    }
    return { playground: initialPlayground(), players };
  }

  constructor(private actions$: Actions, private store: Store, private codeService: CodeService) {}
}
