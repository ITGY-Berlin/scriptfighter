import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { editorTriggerIsPlaybackOpen, editorTriggerToggleIsPlaybackOpen } from '../actions/editor.actions';
import { selectEditorIsPlaybackOpen } from '../selectors/editor.selectors';

@Injectable()
export class EditorPlaybackEffects {
  changeRoute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorTriggerIsPlaybackOpen),
        tap(({ payload }) => {
          // state in store will changed from guard
          if (payload.isPlaybackOpen) {
            this.router.navigate(['editor', { outlets: { overlay: ['playback'] } }], {
              relativeTo: this.activatedRoute,
            });
          } else {
            this.router.navigate(['editor', { outlets: { overlay: null } }], { relativeTo: this.activatedRoute });
          }
        }),
      ),
    { dispatch: false },
  );

  changeRouteOnToggle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorTriggerToggleIsPlaybackOpen),
        withLatestFrom(this.store.select(selectEditorIsPlaybackOpen)),
        tap(([action, isPlaybackOpen]) => {
          // state in store will changed from guard
          if (!isPlaybackOpen) {
            this.router.navigate(['editor', { outlets: { overlay: ['playback'] } }], {
              relativeTo: this.activatedRoute,
            });
          } else {
            this.router.navigate(['editor', { outlets: { overlay: null } }], { relativeTo: this.activatedRoute });
          }
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}
}
