import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPasswordValidator } from 'src/app/shared/validators/passwordMatch.validator';
import { FormType } from '../models/formtype.enum';

@Injectable()
export class AuthFormService {
  constructor() {}

  private _formType: FormType = FormType.LOGIN;

  private _authForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).+$'),
      ],
      nonNullable: true,
    }),
    confirmPassword: new FormControl('', { nonNullable: true }),
  });

  activateConfirmPassword() {
    if (this._formType === FormType.REGISTER) {
      this._authForm.controls.confirmPassword.addValidators([
        Validators.required,
      ]);
      this._authForm.setValidators(matchPasswordValidator());
    } else {
      this._authForm.controls.confirmPassword.removeValidators([
        Validators.required,
      ]);
      this._authForm.setValidators([]);
    }
    this._authForm.controls.confirmPassword.updateValueAndValidity();
  }

  reset() {
    this._authForm.reset();
  }

  markAllAsDirtyAndTouched() {
    Object.keys(this._authForm.controls).forEach((key) => {
      const control = this._authForm.get(key);
      control?.markAsDirty();
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }

  switchFormType() {
    this.formType === FormType.LOGIN
      ? (this._formType = FormType.REGISTER)
      : (this._formType = FormType.LOGIN);
    this.activateConfirmPassword();
  }

  getConfirmPasswordErrors() {
    return Object.assign(
      {},
      this._authForm.errors,
      this.confirmPassword.errors
    );
  }

  get formType() {
    return this._formType;
  }

  get username() {
    return this._authForm.controls.username;
  }

  get password() {
    return this._authForm.controls.password;
  }

  get confirmPassword() {
    return this._authForm.controls.confirmPassword;
  }

  get errors() {
    return this._authForm.errors;
  }

  get authForm() {
    return this._authForm;
  }
}
