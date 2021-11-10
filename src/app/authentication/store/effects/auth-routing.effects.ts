import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { authCloseModal } from '../actions/auth.action';

@Injectable()
export class AuthRoutingEffects {
  authCloseModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authCloseModal),
        tap(() => this.router.navigate([{ outlets: { auth: null } }])),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private router: Router) {}
}
