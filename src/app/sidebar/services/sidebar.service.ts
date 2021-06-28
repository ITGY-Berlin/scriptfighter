import { Portal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Theme } from '../models/theme.enum';
import {
  sidebarClose,
  sidebarOpen,
  sidebarSetExistPortal,
  sidebarSetExpand,
  sidebarSetTheme,
} from '../store/actions/sidebar.action';
import {
  selectSidebarExistsPortal,
  selectSidebarIsExpended,
  selectSidebarIsOpen,
  selectSidebarTheme,
} from '../store/selectors/sidebar.selector';

export interface SidebarActionItem {
  icon: string;
  title: string;
  active?: boolean;
  url?: string; // if url set the item will be a link
  intern?: boolean; // if the url is internal
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  actionItems$: Observable<SidebarActionItem[]>;
  action$: Observable<string>;
  sidebarPortal$: Observable<Portal<any> | null>;
  existsSidebarPortal$: Observable<boolean>;
  theme$: Observable<Theme>;
  isOpen$: Observable<boolean>;
  isExpended$: Observable<boolean>;

  private _actionItems$ = new BehaviorSubject<SidebarActionItem[]>([]);
  private _action$ = new Subject<string>();
  private _sidebarPortal$ = new BehaviorSubject<Portal<any> | null>(null);

  constructor(private store: Store) {
    this.actionItems$ = this._actionItems$.asObservable();
    this.action$ = this._action$.asObservable();
    this.sidebarPortal$ = this._sidebarPortal$.asObservable();
    this.existsSidebarPortal$ = this.store.select(selectSidebarExistsPortal);
    this.theme$ = this.store.select(selectSidebarTheme);
    this.isOpen$ = this.store.select(selectSidebarIsOpen);
    this.isExpended$ = this.store.select(selectSidebarIsExpended);
  }

  openSidebarMennu() {
    this.setIsExpanded(false);
    this.store.dispatch(sidebarSetExistPortal({ payload: false }));
    this.store.dispatch(sidebarOpen());
  }

  openSidebar() {
    this.store.dispatch(sidebarOpen());
  }

  closeSidebar() {
    this.store.dispatch(sidebarClose());
  }

  setSidebarPortal(component: Portal<any>) {
    this.store.dispatch(sidebarSetExistPortal({ payload: true }));
    this._sidebarPortal$.next(component);
  }

  setIsExpanded(isExpended: boolean) {
    this.store.dispatch(sidebarSetExpand({ payload: isExpended }));
  }

  setActions(actionItems: SidebarActionItem[] | null) {
    if (!actionItems) {
      this._actionItems$.next([]);
      return;
    }
    this._actionItems$.next(actionItems);
  }

  setLightTheme(lightTheme: boolean) {
    const theme = lightTheme ? Theme.light : Theme.dark;
    this.store.dispatch(sidebarSetTheme({ payload: { theme } }));
  }

  /**
   * active the icon for title
   * @param title title of the relpacing item
   * @param active active replace the old one
   */
  activeIcon(title: string, active: boolean) {
    const currentActionItems = this._actionItems$.getValue();
    const replacedActionItems = currentActionItems.map((item) => {
      if (item.title === title) {
        item.active = active;
      }
      return item;
    });
    this._actionItems$.next(replacedActionItems);
  }

  /**
   * replace the icon for title
   * @param title title of the relpacing item
   * @param icon new icon to replace the old one
   */
  replaceIcon(title: string, icon: string) {
    const currentActionItems = this._actionItems$.getValue();
    const replacedActionItems = currentActionItems.map((item) => {
      if (item.title === title) {
        item.icon = icon;
      }
      return item;
    });
    this._actionItems$.next(replacedActionItems);
  }

  callAction(title: string) {
    this._action$.next(title);
  }
}
