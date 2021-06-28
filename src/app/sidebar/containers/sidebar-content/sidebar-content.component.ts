import { Portal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { UserState } from '../../../shared/store/reducers/user.reducer';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'sf-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarContentComponent implements OnInit, OnDestroy {
  @HostBinding('class.expanded') isExpanded = false;

  isExpanded$: Observable<boolean> | undefined;
  existsSidebarPortal$: Observable<boolean> | undefined;
  sidebarPortal$: Observable<Portal<any> | null> | undefined;
  user$: Observable<UserState> | undefined;

  private subscription: Subscription | undefined;

  constructor(private sidebarService: SidebarService, private userService: UserService) {}

  ngOnInit(): void {
    this.isExpanded$ = this.sidebarService.isExpended$;
    this.sidebarPortal$ = this.sidebarService.sidebarPortal$;
    this.existsSidebarPortal$ = this.sidebarService.existsSidebarPortal$;
    this.user$ = this.userService.user$;

    this.subscription = this.isExpanded$.subscribe((isExpanded) => {
      this.isExpanded = isExpanded;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
