import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { ValidationMessages } from '../../models/validation-messages.interface';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { RequiredAsteriskPipe } from '../../pipes/required-asterisk.pipe';

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
    RequiredAsteriskPipe,
  ],
})
export class FormControlComponent {
  constructor(private localService: LocalisationService) {}
  @Input() validationMessages!: ValidationMessages;
  @Input() usePasswordIcon: boolean = false;
  @Input() placeholder: string = '';
  @Input() caption: string = "";
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() required = false;


  @Output() onBlurEvent = new EventEmitter<Event>();
  @Output() onChangeEvent = new EventEmitter<Event>();
  @Output() onKeyUpEvent = new EventEmitter<Event>();

  onBlur(event: Event): void {
    this.control.markAsTouched();
    this.onBlurEvent.emit(event);
  }

  onChange(event: Event): void {
    this.onChangeEvent.emit(event);
  }

  onKeyUp(event: Event): void {
    this.onKeyUpEvent.emit(event);
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
