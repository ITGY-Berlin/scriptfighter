import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'sf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isOpen$: Observable<boolean>;

  constructor(private sidebarService: SidebarService) {
    this.isOpen$ = this.sidebarService.isOpen$;
  }

  toggleOpen(isOpen: boolean) {
    if (isOpen) {
      this.sidebarService.openSidebarMennu();
    } else {
      this.sidebarService.closeSidebar();
    }
  }
}
