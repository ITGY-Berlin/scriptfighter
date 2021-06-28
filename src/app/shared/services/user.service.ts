import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from '../store/reducers/user.reducer';
import { selectUserState } from '../store/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user$: Observable<UserState>;

  constructor(private store: Store, private angularFireAuth: AngularFireAuth) {
    this.user$ = this.store.select(selectUserState);
  }

  getFirebaseUser() {
    return this.angularFireAuth.user;
  }
}
