import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@scriptfighter/shared';
import { SidebarModule } from '../sidebar/sidebar.module';
import { StartpageRoutingModule } from './startpage-routing.module';
import { StartpageStageComponent } from './startpage-stage/startpage-stage.component';
import { StartpageComponent } from './startpage/startpage.component';

@NgModule({
  declarations: [StartpageComponent, StartpageStageComponent],
  imports: [CommonModule, StartpageRoutingModule, SharedModule, SidebarModule],
})
export class StartpageModule {}
