import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HealthBarComponent } from './health-bar/health-bar.component';
import { StageComponent } from './stage/stage.component';
import { BackgroundComponent } from './background/background.component';
import { PlaytimePipe } from './stage/playtime.pipe';
import { FighterModule } from './fighter/fighter.module';

@NgModule({
  declarations: [StageComponent, HealthBarComponent, BackgroundComponent, PlaytimePipe],
  imports: [
    CommonModule,
    FighterModule
  ],
  exports: [StageComponent]
})
export class StageModule { }
