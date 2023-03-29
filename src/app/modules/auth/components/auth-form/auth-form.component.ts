import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { WindowService } from 'src/app/core/services/window.service';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { AuthFormService } from '../../services/auth-form.service';
import { ValidationMessages } from 'src/app/shared/models/validation-messages.interface';
import { FormType } from '../../models/formtype.enum';
import { AuthService } from '../../services/auth.service';
import { Yad2Response } from 'src/app/core/models/yad2-response.interface';
import { ReactiveMessageService } from 'src/app/core/services/error-messages.service';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  providers: [ReactiveMessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthFormComponent implements OnInit {
  constructor(
    private localService: LocalisationService,
    private windowService: WindowService,
    private authFormService: AuthFormService,
    private authService: AuthService,
    private responseMessageService: ReactiveMessageService,
    private router: Router
  ) {}

  local = this.localService.auth;
  images = this.localService.images.auth;
  isMobileWindowWidth$: Observable<boolean> = this.windowService
    .windowWidth$()
    .pipe(map((w) => (w > 875 ? true : false)));

  usernameValidationMessages: ValidationMessages = {
    required: this.local.usernameRequired,
    email: this.local.badUsernameFormat,
  };

  passwordValidationMessages: ValidationMessages = {
    required: this.local.passwordRequired,
    pattern: this.local.badPasswordFormat,
    minlength: this.local.badPasswordLength,
  };

  confirmPasswordValidationMessages: ValidationMessages = {
    required: this.local.confirmPasswordRequired,
    passwordMatch: this.local.passwordNotMatching,
  };

  ngOnInit(): void {}

  switchForms() {
    this.authFormService.reset();
    this.authFormService.switchFormType();
  }

  authenticate(e: Event) {
    e.preventDefault();
    if (this.authForm.valid)
      this.formType === FormType.LOGIN ? this.login() : this.register();
    this.authFormService.markAllAsDirtyAndTouched();
  }

  login() {
    this.authService
      .login({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        next: () => {
          this.responseMessageService.emitMessage(this.local.loginSuccessful);
          setTimeout(() => this.successfulLoginRoute(), 1500);
        },
        error: (err: Yad2Response) => {
          this.responseMessageService.emitError(err.message);
        },
      });
  }

  successfulLoginRoute() {
    this.router.navigate(['main']);
  }

  register() {
    this.authService
      .register({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        next: () => {
          this.switchForms();
          this.responseMessageService.emitMessage(
            this.local.registerationSuccessful
          );
        },
        error: (err: Yad2Response) => {
          this.responseMessageService.emitError(err.message);
        },
      });
  }

  get message$() {
    return this.responseMessageService.message$;
  }

  get error$() {
    return this.responseMessageService.error$;
  }

  get authForm() {
    return this.authFormService.authForm;
  }

  get formType() {
    return this.authFormService.formType;
  }

  get username() {
    return this.authFormService.username;
  }

  get password() {
    return this.authFormService.password;
  }

  get confirmPassword() {
    return this.authFormService.confirmPassword;
  }

  get FormType() {
    return FormType;
  }

  get confirmPasswordErrors() {
    return this.authFormService.getConfirmPasswordErrors();
  }

  get isLoginType() {
    return this.formType === FormType.LOGIN;
  }
}
