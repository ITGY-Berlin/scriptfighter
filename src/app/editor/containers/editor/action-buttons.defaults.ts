import { SidebarActionItem } from '../../../sidebar/services/sidebar.service';

export const actionButtonsBase: SidebarActionItem[] = [
  { title: 'playback', icon: 'fas fa-tv' },
  { title: 'enemy code', icon: 'fas fa-random' },
  { title: 'settings', icon: 'fas fa-cogs' },
];

export const actionButtonsEnemyCode: SidebarActionItem[] = [
  { title: 'show list', icon: 'fas fa-list-alt', url: 'list', intern: true },
];

export const actionButtonsSignedOut: SidebarActionItem[] = [
  { title: 'save', icon: 'fas fa-save' },
  ...actionButtonsBase,
];

export const actionButtonsSignedIn: SidebarActionItem[] = [
  { title: 'save', icon: 'fas fa-save' },
  ...actionButtonsBase,
  { title: 'push', icon: 'fas fa-upload' },
];
