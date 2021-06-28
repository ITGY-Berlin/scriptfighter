import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Theme } from '../../models/theme.enum';
import { SidebarActionItem, SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'sf-sidebar-action',
  templateUrl: './sidebar-action.component.html',
  styleUrls: ['./sidebar-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarActionComponent implements OnInit, OnDestroy {
  @HostBinding('class.theme-light') isLightTheme = false;

  actionItems$: Observable<SidebarActionItem[]> | undefined;

  private subscription: Subscription | undefined;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.actionItems$ = this.sidebarService.actionItems$;
    this.subscription = this.sidebarService.theme$.subscribe((theme) => (this.isLightTheme = theme === Theme.light));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  actionItemClicked(actionItem: SidebarActionItem) {
    this.sidebarService.callAction(actionItem.title);
  }
}
