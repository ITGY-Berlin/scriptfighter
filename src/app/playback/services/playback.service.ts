import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  playbackCalculateBegin,
  playbackSetStateListIndex,
  playbackStop,
  playbackTogglePlay,
} from '../store/actions/playback.actions';
import { StateListItem } from '../store/reducers/playback.reducer';
import {
  selectPlaybackisPreparing,
  selectPlaybackPlay,
  selectPlaybackStateList,
  selectPlaybackStateListIndex,
} from '../store/selectors/playback.selectors';

@Injectable({
  providedIn: 'root',
})
export class PlaybackService {
  readonly isPreparing$: Observable<boolean>;
  readonly play$: Observable<boolean>;
  readonly stateList$: Observable<StateListItem[]>;
  readonly stateListIndex$: Observable<number>;

  constructor(private store: Store) {
    this.stateList$ = this.store.select(selectPlaybackStateList);
    this.stateListIndex$ = this.store.select(selectPlaybackStateListIndex);
    this.play$ = this.store.select(selectPlaybackPlay);
    this.isPreparing$ = this.store.select(selectPlaybackisPreparing);

    this.store.dispatch(playbackCalculateBegin());
  }

  setStateListIndex(stateListIndex: number) {
    this.store.dispatch(playbackSetStateListIndex({ payload: { stateListIndex } }));
  }

  togglePlay() {
    this.store.dispatch(playbackTogglePlay());
  }

  stop() {
    this.store.dispatch(playbackStop());
  }
}
