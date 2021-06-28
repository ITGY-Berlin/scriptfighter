import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { CodeService } from '../../../shared/services/code.service';
import { KeyBindService } from '../../../shared/services/key-bind.service';
import { UserService } from '../../../shared/services/user.service';
import { UserFighter } from '../../../shared/store/reducers/user.reducer';
import { SidebarService } from '../../../sidebar/services/sidebar.service';
import { EditorSettingsService } from '../../services/editor-settings.service';
import { EditorService } from '../../services/editor.service';
import { SettingsComponent } from '../settings/settings.component';
import { actionButtonsEnemyCode, actionButtonsSignedIn, actionButtonsSignedOut } from './action-buttons.defaults';

@Component({
  selector: 'sf-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  editorOptions$!: Observable<any>;
  code = '';
  componentPortal!: ComponentPortal<SettingsComponent>;
  isReadOnly = false;

  private ngDestroy$: Subject<void> = new Subject();

  constructor(
    private codeService: CodeService,
    private userService: UserService,
    private editorSettingsService: EditorSettingsService,
    private editorService: EditorService,
    private keyBindService: KeyBindService,
    private sidebarService: SidebarService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.editorOptions$ = this.editorService.editorOptions$;
    this.registerSidebarListener();
    this.setDefaults();

    this.editorService.code$.pipe(takeUntil(this.ngDestroy$)).subscribe((code) => {
      this.code = code;
    });

    this.userService.user$
      .pipe(
        takeUntil(this.ngDestroy$),
        takeWhile(() => !this.isReadOnly),
      )
      .subscribe((user) => {
        if (user && user.fighter) {
          this.codeService.setFighterName(user.fighter.name, 1);
          this.codeService.setCode(user.fighter.code, 1);
          this.sidebarService.setActions(actionButtonsSignedIn);
        }
      });

    this.route.data.pipe(takeUntil(this.ngDestroy$)).subscribe((data) => {
      const fighter: UserFighter | undefined = data.fighter;
      if (fighter) {
        this.isReadOnly = true;
        this.sidebarService.setActions(actionButtonsEnemyCode);
        this.code = fighter.code;
      }
    });

    // bind key ctrl + s
    if (navigator.platform.match('Mac')) {
      this.keyBindService
        .matchBinding$('s', ['meta'])
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((event) => {
          event.preventDefault();
          this.editorService.saveCode(this.code);
        });
    } else {
      this.keyBindService
        .matchBinding$('s', ['ctrl'])
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((event) => {
          event.preventDefault();
          this.editorService.saveCode(this.code);
        });
    }
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private registerSidebarListener() {
    this.componentPortal = new ComponentPortal(SettingsComponent, null, null, this.componentFactoryResolver);
    this.sidebarService.setActions(actionButtonsSignedOut);
    this.sidebarService.action$.pipe(takeUntil(this.ngDestroy$)).subscribe((action) => {
      switch (action) {
        case 'save': {
          this.editorService.saveCode(this.code);
          break;
        }
        case 'playback': {
          this.editorSettingsService.togglePlayback();
          break;
        }
        case 'settings': {
          this.editorSettingsService.openEditorSettings(this.componentPortal);
          break;
        }
        case 'push': {
          this.editorService.pushCode(this.code);
          break;
        }
        case 'enemy code': {
          this.editorService.showEnemyCode();
          break;
        }
      }
    });
  }

  private setDefaults() {
    this.editorSettingsService.isPlaybackOpen$.pipe(takeUntil(this.ngDestroy$)).subscribe((isOpen) => {
      this.sidebarService.activeIcon('playback', isOpen);
    });

    this.editorService.selectEditorShowEnemyCode$.pipe(takeUntil(this.ngDestroy$)).subscribe((isEnemyCode) => {
      this.sidebarService.activeIcon('enemy code', isEnemyCode);
    });
  }
}
