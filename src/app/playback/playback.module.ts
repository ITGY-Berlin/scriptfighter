import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@scriptfighter/shared';
import { PlaybackComponent } from './containers/playback/playback.component';
import { PlaybackRoutingModule } from './playback-routing.module';
import { PlaybackFirebaseEffects } from './store/effects/playback-firebase.effects';
import { PlaybackEffects } from './store/effects/playback.effects';
import { PLAYBACK_STORE_KEY, scriptPlayerReducer } from './store/reducers/playback.reducer';

@NgModule({
  declarations: [PlaybackComponent],
  imports: [
    CommonModule,
    PlaybackRoutingModule,
    SharedModule,
    EffectsModule.forFeature([PlaybackEffects, PlaybackFirebaseEffects]),
    StoreModule.forFeature(PLAYBACK_STORE_KEY, scriptPlayerReducer),
  ],
})
export class PlaybackModule {}
