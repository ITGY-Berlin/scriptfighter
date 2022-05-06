import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { FirebaseCodeEffects } from './shared/store/effects/firebase-code.effects';
import { FirebaseUserEffects } from './shared/store/effects/firebase-user.effects';
import { SidebarModule } from './sidebar/sidebar.module';
import { metaReducers, reducers } from './store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    EffectsModule.forRoot([FirebaseUserEffects, FirebaseCodeEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    AppRoutingModule,
    SidebarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
