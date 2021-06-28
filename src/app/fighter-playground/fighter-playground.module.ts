import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FighterPlaygroundRoutingModule } from './fighter-playground-routing.module';
import { FighterPlaygroundComponent } from './fighter-playground/fighter-playground.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [FighterPlaygroundComponent],
  imports: [
    CommonModule,
    FighterPlaygroundRoutingModule,
    SharedModule
  ]
})
export class FighterPlaygroundModule { }
