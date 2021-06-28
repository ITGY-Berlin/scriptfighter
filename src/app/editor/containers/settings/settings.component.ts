import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidebarService } from '../../../sidebar/services/sidebar.service';
import { EditorSettingsService } from '../../services/editor-settings.service';

@Component({
  selector: 'sf-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  @HostBinding('class') hostClassList = 'px-4';

  themeChecked$!: Observable<boolean>;
  fontSize$!: Observable<number>;

  constructor(private editorSettingsService: EditorSettingsService, private sidebarService: SidebarService) {}

  ngOnInit() {
    this.themeChecked$ = this.editorSettingsService.editorTheme$.pipe(map((theme) => theme === 'vs-light'));
    this.fontSize$ = this.editorSettingsService.editorFontSize$;
  }

  toggleTheme(checked: boolean) {
    const theme = checked ? 'vs-light' : 'vs-dark';
    this.sidebarService.setLightTheme(checked);
    this.editorSettingsService.setEditorTheme(theme);
  }

  changeFontSize(event: Event) {
    const fontSize: number = parseInt((event.target as HTMLInputElement).value);
    this.editorSettingsService.setFontSize(fontSize);
  }
}
