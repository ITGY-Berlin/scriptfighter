import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FighterComponent } from './fighter/fighter.component';

@NgModule({
  declarations: [FighterComponent],
  imports: [
    CommonModule
  ],
  exports: [FighterComponent]
})
export class FighterModule { }
