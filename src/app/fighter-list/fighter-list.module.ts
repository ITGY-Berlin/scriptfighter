import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FighterListRoutingModule } from './fighter-list-routing.module';
import { FighterListComponent } from './fighter-list/fighter-list.component';
import { FighterCardComponent } from './fighter-card/fighter-card.component';
import { FighterListItemComponent } from './fighter-list-item/fighter-list-item.component';


@NgModule({
  declarations: [FighterListComponent, FighterCardComponent, FighterListItemComponent],
  imports: [
    CommonModule,
    FighterListRoutingModule
  ]
})
export class FighterListModule { }
