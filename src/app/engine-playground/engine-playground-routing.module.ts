import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnginePlaygroundComponent } from './engine-playground/engine-playground.component';


const routes: Routes = [
  {
    path: '',
    component: EnginePlaygroundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnginePlaygroundRoutingModule { }
