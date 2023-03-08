import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { WindowService } from 'src/app/core/services/window.service';
import { map, Observable } from 'rxjs';
import { AuthFormService } from '../../services/authform.service';
import { ValidationMessages } from 'src/app/shared/models/validation-messages.interface';
import { FormType } from '../../models/formtype.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthFormComponent implements OnInit {
  constructor(
    private localService: LocalizationService,
    private windowService: WindowService,
    private authFormService: AuthFormService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  local = this.localService.AuthLocal;
  isMobileWindowWidth$: Observable<boolean> = this.windowService
    .windowLength$()
    .pipe(map((w) => (w > 875 ? true : false)));

  usernameValidationMessages: ValidationMessages = {
    required: this.local.auth.usernameRequired,
    email: this.local.auth.badUsernameFormat,
  };

  passwordValidationMessages: ValidationMessages = {
    required: this.local.auth.passwordRequired,
    pattern: this.local.auth.badPasswordFormat,
    minlength: this.local.auth.badPasswordLength,
  };

  confirmPasswordValidationMessages: ValidationMessages = {
    required: this.local.auth.confirmPasswordRequired,
    passwordMatch: this.local.auth.passwordNotMatching,
  };

  errorMessage: string = '';

  ngOnInit(): void {}

  switchForms() {
    this.authFormService.reset();
    this.authFormService.switchFormType();
  }

  authenticate() {
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
        next: () => {},
        error: (err) => {
          this.errorMessage = err;
          this.cdr.markForCheck();
        },
      });
  }

  register() {
    this.authService
      .register({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        next: () => {},
        error: (err) => {
          this.errorMessage = err;
          this.cdr.markForCheck();
        },
      });
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
