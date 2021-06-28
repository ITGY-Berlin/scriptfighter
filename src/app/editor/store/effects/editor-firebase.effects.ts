import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { selectUserState } from '../../../shared/store/selectors/user.selectors';
import { editorPushCode } from '../actions/editor.actions';

@Injectable()
export class EditorFirebaseEffects {
  sessionExpired$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editorPushCode),
        withLatestFrom(this.store.select(selectUserState)),
        tap(([action, user]) => {
          if (user.uid) {
            this.firebaseService.updateCode(user.uid, action.payload.code);
          }
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private store: Store, private firebaseService: FirebaseService) {}
}
