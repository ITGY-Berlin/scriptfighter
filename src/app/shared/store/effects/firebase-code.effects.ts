import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';
import { noopAction } from '../actions/base.action';
import { userSet, userSetFighter } from '../actions/user.actions';

@Injectable()
export class FirebaseCodeEffects {
  setFirebaseUserCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSet),
      exhaustMap((user) =>
        this.firebaseService.loadCode(user.payload.user.uid!).pipe(
          map((fighterCode) => {
            if (fighterCode) {
              const { code, name } = fighterCode;
              return userSetFighter({ payload: { fighter: { code, name } } });
            }
            return noopAction();
          }),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private firebaseService: FirebaseService) {}
}
