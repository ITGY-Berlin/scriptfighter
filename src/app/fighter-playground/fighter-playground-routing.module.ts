import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FighterPlaygroundComponent } from './fighter-playground/fighter-playground.component';


const routes: Routes = [
  {
    path: '',
    component: FighterPlaygroundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FighterPlaygroundRoutingModule { }
