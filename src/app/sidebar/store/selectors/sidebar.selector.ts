import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SidebarState, SIDEBAR_STORE_KEY } from '../reducers/sidebar.reducer';

export const selectSidebar = createFeatureSelector<SidebarState>(SIDEBAR_STORE_KEY);
export const selectSidebarIsOpen = createSelector(selectSidebar, (state: SidebarState) => state.isOpen);
export const selectSidebarTheme = createSelector(selectSidebar, (state: SidebarState) => state.theme);
export const selectSidebarIsExpended = createSelector(selectSidebar, (state: SidebarState) => state.isExpended);
export const selectSidebarExistsPortal = createSelector(selectSidebar, (state: SidebarState) => state.existsPortal);
