import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpressumRoutingModule } from './impressum-routing.module';
import { ImpressumComponent } from './impressum/impressum.component';


@NgModule({
  declarations: [ImpressumComponent],
  imports: [
    CommonModule,
    ImpressumRoutingModule
  ]
})
export class ImpressumModule { }
