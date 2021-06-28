import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'sf-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signInWithGoogle() {
    this.authenticationService.signInWithGoogle().then(() => {
      this.router.navigate(['editor']);
    });
  }

  signInWithGithub() {
    this.authenticationService.signInWithGithub().then(() => {
      this.router.navigate(['editor']);
    });
  }

  signUp() {
    this.authenticationService.signUp('', '');
  }

  signIn() {
    if (!this.signInForm.valid) {
      return;
    }
    const { email, password } = this.signInForm.value;
    this.authenticationService.signIn(email, password);
  }
}
