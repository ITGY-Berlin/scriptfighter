import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { SidebarService } from '../sidebar/services/sidebar.service';
import { EditorSettingsService } from './services/editor-settings.service';

@Injectable({
  providedIn: 'root',
})
export class EditorGuard implements CanActivate, CanDeactivate<any> {
  constructor(private editorSettingsService: EditorSettingsService, private sidebarService: SidebarService) {}

  canActivate(): boolean {
    this.editorSettingsService.editorTheme$
      .pipe(
        take(1),
        map((theme) => theme === 'vs-light'),
      )
      .subscribe((isLightTheme) => {
        this.sidebarService.setLightTheme(isLightTheme);
      });
    return true;
  }

  canDeactivate(): boolean {
    this.sidebarService.setLightTheme(false);
    this.sidebarService.setActions(null);
    return true;
  }
}
