import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnginePlaygroundRoutingModule } from './engine-playground-routing.module';
import { EnginePlaygroundComponent } from './engine-playground/engine-playground.component';
import { SharedModule } from '../shared';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EnginePlaygroundComponent],
  imports: [
    CommonModule,
    EnginePlaygroundRoutingModule,
    SharedModule,
    FormsModule,
    MonacoEditorModule.forRoot()
  ]
})
export class EnginePlaygroundModule { }
