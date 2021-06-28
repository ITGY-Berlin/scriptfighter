import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { userLoadFirebase, userSet, userUnset } from '../actions/user.actions';

@Injectable()
export class FirebaseUserEffects {
  setFirebaseUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLoadFirebase),
      exhaustMap(() =>
        this.userService.getFirebaseUser().pipe(
          map((user) => {
            if (user) {
              const { email, displayName, photoURL, providerId, uid } = user;
              const userState = {
                email,
                displayName,
                photoURL,
                providerId,
                uid,
                fighter: null,
              };
              return userSet({ payload: { user: userState } });
            }
            return userUnset();
          }),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
