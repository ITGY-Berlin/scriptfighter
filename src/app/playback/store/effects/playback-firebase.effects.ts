import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { codeSetFigherOneName, codeSetFigherTwoName } from '../../../shared/store/actions/code.actions';
import { playbackCalculateBegin } from '../actions/playback.actions';

@Injectable()
export class PlaybackFirebaseEffects {
  calculate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(codeSetFigherOneName, codeSetFigherTwoName),
      map(() => {
        return playbackCalculateBegin();
      }),
    ),
  );

  constructor(private actions$: Actions) {}
}
