import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import { LocalizationService } from './services/localization.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/password-input/input.component';
import { ValidationErrorComponent } from 'src/app/shared/components/validation-error/validation-error.component';
import { SharedModule } from 'src/app/shared/shared.module';
import AuthFormComponent from './components/auth-form/auth-form.component';
import { AuthService } from './services/auth.service';
import { AuthFormService } from './services/authform.service';

@NgModule({
  declarations: [AuthComponent, AuthFormComponent],
  providers: [LocalizationService, AuthFormService, AuthService],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    InputComponent,
    ValidationErrorComponent,
  ],
})
export default class AuthModule {}
