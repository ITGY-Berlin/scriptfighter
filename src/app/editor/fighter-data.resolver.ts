import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../shared/services/firebase.service';
import { UserFighter } from '../shared/store/reducers/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class FighterDataResolver implements Resolve<UserFighter | null> {
  constructor(private firebaseService: FirebaseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserFighter | null> {
    return this.firebaseService.loadCode(route.params.uid);
  }
}
