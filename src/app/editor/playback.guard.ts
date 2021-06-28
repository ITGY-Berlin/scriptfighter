import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { editorSetIsPlaybackOpen } from './store/actions/editor.actions';

@Injectable({
  providedIn: 'root',
})
export class PlaybackGuard implements CanActivate, CanDeactivate<any> {
  constructor(private store: Store) {}

  canActivate(): boolean {
    this.store.dispatch(editorSetIsPlaybackOpen({ payload: { isPlaybackOpen: true } }));
    return true;
  }

  canDeactivate(): boolean {
    this.store.dispatch(editorSetIsPlaybackOpen({ payload: { isPlaybackOpen: false } }));
    return true;
  }
}
