import { createReducer, on } from '@ngrx/store';
import { Theme } from '../../models/theme.enum';
import {
  sidebarClose,
  sidebarOpen,
  sidebarSetExistPortal,
  sidebarSetExpand,
  sidebarSetTheme,
} from '../actions/sidebar.action';

export const SIDEBAR_STORE_KEY = 'sidebar';

export interface SidebarState {
  theme: Theme;
  isOpen: boolean;
  isExpended: boolean;
  existsPortal: boolean;
}

export const initialState: SidebarState = {
  theme: Theme.dark,
  isOpen: false,
  isExpended: false,
  existsPortal: false,
};

export const sidebarReducer = createReducer(
  initialState,
  on(sidebarOpen, (state): SidebarState => ({ ...state, isOpen: true })),
  on(sidebarClose, (state): SidebarState => ({ ...state, isOpen: false })),
  on(sidebarSetTheme, (state, action): SidebarState => ({ ...state, theme: action.payload.theme })),
  on(sidebarSetExpand, (state, action): SidebarState => ({ ...state, isExpended: action.payload })),
  on(sidebarSetExistPortal, (state, action): SidebarState => ({ ...state, existsPortal: action.payload })),
);
