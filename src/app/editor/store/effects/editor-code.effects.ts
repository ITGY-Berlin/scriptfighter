import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { codeSetOne } from '../../../shared/store/actions/code.actions';
import { editorSaveCode } from '../actions/editor.actions';

@Injectable()
export class EditorCodeEffects {
  saveCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editorSaveCode),
      map(({ payload }) => {
        return codeSetOne({ payload });
      }),
    ),
  );

  constructor(private actions$: Actions) {}
}
