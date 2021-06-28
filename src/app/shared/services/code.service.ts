import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { createWorker, removeWorker, WorkerCommand } from 'src/core';
import { codeSetFigherOneName, codeSetFigherTwoName, codeSetOne, codeSetTwo } from '../store/actions/code.actions';
import { selectCodeOne, selectCodeTwo } from '../store/selectors/code.selectors';

@Injectable({
  providedIn: 'root',
})
export class CodeService implements OnDestroy {
  public readonly codeOne$: Observable<string>;
  public readonly codeTwo$: Observable<string>;

  private codeOneWorker$ = new BehaviorSubject<Worker | null>(null);
  private codeTwoWorker$ = new BehaviorSubject<Worker | null>(null);
  private ngOnDestroy$ = new Subject();

  constructor(private store: Store) {
    this.codeOne$ = this.store.select(selectCodeOne).pipe(distinctUntilChanged());
    this.codeTwo$ = this.store.select(selectCodeTwo).pipe(distinctUntilChanged());

    this.codeOne$.pipe(takeUntil(this.ngOnDestroy$)).subscribe((code) => {
      this.prepareWorker(code, 1);
    });

    this.codeTwo$.pipe(takeUntil(this.ngOnDestroy$)).subscribe((code) => {
      this.prepareWorker(code, 2);
    });
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

  executeCode(player: 1 | 2, command: WorkerCommand) {
    const worker = this.getWorker(player);
    if (worker) {
      worker.postMessage(command);
    }
  }

  setCode(code: string, player: 1 | 2) {
    const action = player === 1 ? codeSetOne({ payload: { code } }) : codeSetTwo({ payload: { code } });
    this.store.dispatch(action);
  }

  setFighterName(name: string, player: 1 | 2) {
    const action =
      player === 1 ? codeSetFigherOneName({ payload: { name } }) : codeSetFigherTwoName({ payload: { name } });
    this.store.dispatch(action);
  }

  message$(player: 1 | 2): Observable<MessageEvent> {
    if (player === 1) {
      return this.codeOneWorker$.pipe(
        filter((worker) => !!worker),
        switchMap((worker) => fromEvent<MessageEvent>(worker!, 'message')),
      );
    }
    return this.codeTwoWorker$.pipe(
      filter((worker) => !!worker),
      switchMap((worker) => fromEvent<MessageEvent>(worker!, 'message')),
    );
  }

  private prepareWorker(code: string, player: 1 | 2) {
    const workerBefore = this.getWorker(player);
    removeWorker(workerBefore);
    const worker = createWorker(code);
    this.setWorker(player, worker!);
  }

  private getWorker(player: 1 | 2): Worker | null {
    if (player === 1) {
      return this.codeOneWorker$.getValue();
    } else {
      return this.codeTwoWorker$.getValue();
    }
  }

  private setWorker(player: 1 | 2, worker: Worker) {
    if (player === 1) {
      this.codeOneWorker$.next(worker);
    } else {
      this.codeTwoWorker$.next(worker);
    }
  }
}
