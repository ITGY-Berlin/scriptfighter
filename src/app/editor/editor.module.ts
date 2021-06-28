import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@scriptfighter/shared';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';
import { SidebarModule } from '../sidebar/sidebar.module';
import { EditorComponent } from './containers/editor/editor.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { EditorRoutingModule } from './editor-routing.module';
import { MonacoConfig } from './monaco.config';
import { EditorCodeEffects } from './store/effects/editor-code.effects';
import { EditorFirebaseEffects } from './store/effects/editor-firebase.effects';
import { EditorPlaybackEffects } from './store/effects/editor-playback.effects';
import { editorReducer, EDITOR_STORE_KEY } from './store/reducers/editor.reducer';

@NgModule({
  declarations: [EditorComponent, SettingsComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    SharedModule,
    FormsModule,
    SidebarModule,
    EffectsModule.forFeature([EditorPlaybackEffects, EditorCodeEffects, EditorFirebaseEffects]),
    StoreModule.forFeature(EDITOR_STORE_KEY, editorReducer),
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.
  ],
  providers: [{ provide: NGX_MONACO_EDITOR_CONFIG, useValue: MonacoConfig }],
  entryComponents: [SettingsComponent],
  exports: [EditorComponent],
})
export class EditorModule {}
