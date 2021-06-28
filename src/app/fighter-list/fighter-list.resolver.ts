import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FirebaseCode } from '../shared/models';
import { FirebaseService } from '../shared/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class FighterListResolver implements Resolve<FirebaseCode[]> {
  constructor(private firebaseService: FirebaseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FirebaseCode[]> {
    return this.firebaseService.loadList();
  }
}
