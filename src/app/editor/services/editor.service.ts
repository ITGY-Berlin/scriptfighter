import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { playbackCalculateBegin } from '../../playback/store/actions/playback.actions';
import { selectCodeOne, selectCodeTwo } from '../../shared/store/selectors/code.selectors';
import {
  editorPushCode,
  editorSaveCode,
  editorSaveShowEnemyCodeToggle,
  editorStoreCode,
} from '../store/actions/editor.actions';
import {
  selectEditorCode,
  selectEditorIsReadOnly,
  selectEditorOptions,
  selectEditorShowEnemyCode,
} from '../store/selectors/editor.selectors';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  readonly code$: Observable<string>;
  readonly editorOptions$: Observable<any>;
  readonly selectEditorShowEnemyCode$: Observable<boolean>;

  constructor(private store: Store) {
    this.selectEditorShowEnemyCode$ = this.store.select(selectEditorShowEnemyCode);
    this.code$ = this.selectEditorShowEnemyCode$.pipe(
      switchMap((isEnemyCode) => {
        const ownCode$ = combineLatest([this.store.select(selectEditorCode), this.store.select(selectCodeOne)]).pipe(
          map(([codeEditor, codeOne]) => codeEditor ?? codeOne),
        );
        return isEnemyCode ? this.store.select(selectCodeTwo) : ownCode$;
      }),
    );
    // combine readonly if the code is from enemy
    this.editorOptions$ = combineLatest([
      this.store.select(selectEditorOptions),
      this.store.select(selectEditorIsReadOnly),
    ]).pipe(map(([options, readOnly]) => ({ ...options, readOnly })));
  }

  /**
   * Store the Code without any effects to be able to load same code later
   * @param code
   */
  storeCode(code: string) {
    this.store.dispatch(editorStoreCode({ payload: { code } }));
  }

  /**
   * Save code to also for calculation of the playback
   * @param code
   */
  saveCode(code: string) {
    localStorage.setItem('savedCode', code);
    this.store.dispatch(editorSaveCode({ payload: { code } }));
    this.store.dispatch(playbackCalculateBegin());
  }

  pushCode(code: string) {
    this.store.dispatch(editorPushCode({ payload: { code } }));
  }

  showEnemyCode() {
    this.store.dispatch(editorSaveShowEnemyCodeToggle());
  }
}
