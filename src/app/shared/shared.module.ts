import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { ScrubberComponent } from './components/scrubber/scrubber.component';
import { StageModule } from './components/stage/stage.module';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';

@NgModule({
  declarations: [ScrubberComponent, LoadingOverlayComponent, ToggleSwitchComponent],
  imports: [CommonModule, ReactiveFormsModule, StageModule],
  exports: [ReactiveFormsModule, StageModule, ScrubberComponent, LoadingOverlayComponent, ToggleSwitchComponent],
})
export class SharedModule {}
