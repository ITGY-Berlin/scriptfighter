import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@scriptfighter/shared';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './containers/authentication/authentication.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { UserInfoComponent } from './containers/user-info/user-info.component';
import { AuthRoutingEffects } from './store/effects/auth-routing.effects';

@NgModule({
  declarations: [SignInComponent, UserInfoComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    SharedModule,
    OverlayModule,
    StoreModule,
    EffectsModule.forFeature([AuthRoutingEffects]),
  ],
  exports: [],
})
export class AuthenticationModule {}
