import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SharedModule } from '@scriptfighter/shared';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, UserInfoComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    SharedModule
  ],
  exports: []
})
export class AuthenticationModule { }
