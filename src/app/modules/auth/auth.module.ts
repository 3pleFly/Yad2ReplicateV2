import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';
import { ValidationErrorComponent } from 'src/app/shared/components/validation-error/validation-error.component';
import AuthFormComponent from './components/auth-form/auth-form.component';
import { AuthService } from './services/auth.service';
import { AuthFormService } from './services/auth-form.service';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [AuthComponent, AuthFormComponent],
  providers: [LocalisationService, AuthFormService, AuthService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    ValidationErrorComponent,
    RouterModule.forChild(routes),
  ],
})
export default class AuthModule {}
