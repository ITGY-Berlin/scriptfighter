import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { UserService } from '../../shared/services/user.service';
import { UserState } from '../../shared/store/reducers/user.reducer';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'sf-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  user$: Observable<UserState> | undefined;
  formControl = new FormControl('', [Validators.required]);
  invalidUserName = false;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseService: FirebaseService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.user$ = this.userService.user$.pipe(
      tap((user) => {
        if (user && user.fighter) {
          this.formControl.setValue(user.fighter.name);
        }
      }),
    );
  }

  signOut() {
    this.authenticationService.SignOut().then(() => {
      this.router.navigate(['']);
    });
  }

  async saveFighterName(uid: string) {
    if (!this.formControl.valid) {
      return;
    }
    const fighterName = this.formControl.value;
    const fighter = await this.fighterExists(fighterName);
    if (fighter) {
      this.invalidUserName = true;
      if (fighter.uid === uid) {
        this.invalidUserName = false;
      }
    } else {
      this.invalidUserName = false;
      this.firebaseService.updateFighterName(uid, fighterName);
    }
    this.changeDetectorRef.markForCheck();
  }

  private async fighterExists(fighterName: string) {
    return this.firebaseService.search(fighterName).toPromise();
  }
}
