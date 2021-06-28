import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FighterListComponent } from './fighter-list/fighter-list.component';
import { FighterListResolver } from './fighter-list.resolver';


const routes: Routes = [
  {
    path: '',
    component: FighterListComponent,
    resolve: {
      fighterList: FighterListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FighterListRoutingModule { }
