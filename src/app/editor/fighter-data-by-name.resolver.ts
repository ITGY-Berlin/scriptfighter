import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseService } from '../shared/services/firebase.service';
import { UserFighter } from '../shared/store/reducers/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class FighterDataByNameResolver implements Resolve<UserFighter | null> {
  constructor(private firebaseService: FirebaseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserFighter | null> {
    const fighterName = route.params.name;
    if (fighterName) {
      return this.firebaseService.loadCodeOfFighter(fighterName);
    }
    return of({ code: '', name: '' });
  }
}
