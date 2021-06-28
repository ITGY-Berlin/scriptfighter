import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SidebarActionItem, SidebarService } from '../../sidebar/services/sidebar.service';

const defaultSocialItems: SidebarActionItem[] = [
  { title: 'facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
  { title: 'twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
  { title: 'github', icon: 'fab fa-github', url: 'https://github.com' },
];

@Component({
  selector: 'sf-startpage-stage',
  templateUrl: './startpage-stage.component.html',
  styleUrls: ['./startpage-stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartpageStageComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.setActions(defaultSocialItems);
  }
}
