import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthenticationModule } from '../authentication/authentication.module';
import { BurgerMenuComponent } from './components/burger-menu/burger-menu.component';
import { SidebarActionComponent } from './containers/sidebar-action/sidebar-action.component';
import { SidebarContentComponent } from './containers/sidebar-content/sidebar-content.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { sidebarReducer, SIDEBAR_STORE_KEY } from './store/reducers/sidebar.reducer';

@NgModule({
  declarations: [SidebarComponent, BurgerMenuComponent, SidebarActionComponent, SidebarContentComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    PortalModule,
    AuthenticationModule,
    StoreModule.forFeature(SIDEBAR_STORE_KEY, sidebarReducer),
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
