import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'sf-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signInWithGoogle() {
    this.authenticationService.signInWithGoogle().then(() => {
      this.authenticationService.closeModal();
    });
  }

  signInWithGithub() {
    this.authenticationService.signInWithGithub().then(() => {
      this.authenticationService.closeModal();
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

  closeModal() {
    this.authenticationService.closeModal();
  }
}
