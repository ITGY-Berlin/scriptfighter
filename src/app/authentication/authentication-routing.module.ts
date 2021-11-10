import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './containers/authentication/authentication.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: AuthenticationComponent,
    outlet: 'auth',
  },
  {
    path: 'user',
    component: AuthenticationComponent,
    outlet: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
