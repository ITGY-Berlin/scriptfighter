import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarService } from '../../sidebar/services/sidebar.service';
import { SettingsComponent } from '../containers/settings/settings.component';
import {
  editorSetFontSize,
  editorSetTheme,
  editorTriggerIsPlaybackOpen,
  editorTriggerToggleIsPlaybackOpen,
} from '../store/actions/editor.actions';
import { MonacoTheme } from '../store/reducers/editor.reducer';
import {
  selectEditorFontSize,
  selectEditorIsPlaybackOpen,
  selectEditorShowEnemyCode,
  selectEditorTabSize,
  selectEditorTheme,
} from '../store/selectors/editor.selectors';

@Injectable({
  providedIn: 'root',
})
export class EditorSettingsService {
  readonly editorTheme$: Observable<MonacoTheme>;
  readonly editorFontSize$: Observable<number>;
  readonly editorTabSize$: Observable<number>;
  readonly isPlaybackOpen$: Observable<boolean>;
  readonly showEnemyCode$: Observable<boolean>;

  constructor(private sidebarService: SidebarService, private store: Store) {
    this.editorTheme$ = this.store.select(selectEditorTheme);
    this.editorFontSize$ = this.store.select(selectEditorFontSize);
    this.editorTabSize$ = this.store.select(selectEditorTabSize);
    this.isPlaybackOpen$ = this.store.select(selectEditorIsPlaybackOpen);
    this.showEnemyCode$ = this.store.select(selectEditorShowEnemyCode);
  }

  setEditorTheme(theme: MonacoTheme) {
    this.store.dispatch(editorSetTheme({ payload: { theme: theme } }));
  }

  setFontSize(fontSize: number) {
    this.store.dispatch(editorSetFontSize({ payload: { fontSize: fontSize } }));
  }

  openPlayback(isPlaybackOpen: boolean) {
    this.store.dispatch(editorTriggerIsPlaybackOpen({ payload: { isPlaybackOpen } }));
  }

  togglePlayback() {
    this.store.dispatch(editorTriggerToggleIsPlaybackOpen());
  }

  openEditorSettings(componentPortal: ComponentPortal<SettingsComponent>) {
    this.sidebarService.setSidebarPortal(componentPortal);
    this.sidebarService.setIsExpanded(true);
    this.sidebarService.openSidebar();
  }
}
