import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';


const routes: Routes = [
  {
    path: '',
    component: StartpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartpageRoutingModule { }
