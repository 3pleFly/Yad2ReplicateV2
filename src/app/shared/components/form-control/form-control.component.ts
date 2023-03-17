import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { ValidationMessages } from '../../models/validation-messages.interface';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'app-form-control',
  standalone: true,
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationErrorComponent,
  ],
})
export class FormControlComponent {
  constructor(private localService: LocalisationService) {}
  @Input() validationMessages!: ValidationMessages;
  @Input() usePasswordIcon: boolean = false;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() type: string = 'text';

  onBlur(event: Event): void {
    this.control.markAsTouched();
  }

  togglePasswordInput() {
    this.type === 'password' ? (this.type = 'text') : (this.type = 'password');
  }

  get images() {
    const { visiblePasswordIcon, invisiblePasswordIcon } =
      this.localService.images.auth;
    return { visiblePasswordIcon, invisiblePasswordIcon };
  }

  get passwordIcon() {
    return this.type === 'password'
      ? this.images.visiblePasswordIcon
      : this.images.invisiblePasswordIcon;
  }
}
