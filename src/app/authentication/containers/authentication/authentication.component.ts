import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  overlayRef: OverlayRef | undefined;

  constructor(private overlay: Overlay, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.url[0].path;
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    this.overlayRef = this.overlay.create({
      backdropClass: 'modal-background',
      positionStrategy,
      hasBackdrop: true,
    });
    const userProfilePortal =
      path === 'sign-in' ? new ComponentPortal(SignInComponent) : new ComponentPortal(UserInfoComponent);
    this.overlayRef.attach(userProfilePortal);
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }
}
