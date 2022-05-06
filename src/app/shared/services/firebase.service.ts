import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirebaseCode, FirebaseFighter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  updateCode(id: string, code: string) {
    return this.db.collection('code').doc(id).update({ code });
  }

  updateFighterName(id: string, name: string) {
    return this.db.collection('code').doc(id).update({ name });
  }

  loadCode(uid: string): Observable<FirebaseCode | null> {
    return this.db
      .collection('code')
      .doc(uid)
      .get()
      .pipe(
        map<any, FirebaseCode | null>((code) => {
          const exists = code.exists;
          if (exists) {
            return code.data();
          }
          return null;
        }),
      );
  }

  loadCodeOfFighter(fighterName: string): Observable<FirebaseCode | null> {
    return this.search(fighterName).pipe(
      switchMap((fighterData) => {
        if (fighterData) {
          const { uid } = fighterData;
          return this.loadCode(uid);
        }
        return of(null);
      }),
    );
  }

  search(fighterName: string): Observable<FirebaseFighter | null> {
    return this.db
      .collection('fighter')
      .doc(fighterName)
      .get()
      .pipe(
        map<any, FirebaseFighter | null>((fighter) => {
          const exists = fighter.exists;
          if (exists) {
            return fighter.data();
          }
          return null;
        }),
      );
  }

  loadList(): Promise<FirebaseCode[]> {
    return this.db
      .collection('code')
      .ref.limit(100)
      .get()
      .then((data: any) => data.docs.map((doc: any) => doc.data() as FirebaseCode));
  }
}
