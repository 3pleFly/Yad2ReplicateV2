import { CommonModule, DecimalPipe } from '@angular/common';
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
import { isANumber } from 'src/app/core/helpers/functions.helpers';

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
  providers: [DecimalPipe],
})
export class FormControlComponent {
  constructor(
    private localService: LocalisationService,
    private decimalPipe: DecimalPipe
  ) {}
  @Input() validationMessages!: ValidationMessages;
  @Input() usePasswordIcon: boolean = false;
  @Input() placeholder: string = '';
  @Input() caption: string = '';
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() required = false;
  @Input() maxLength = 999;
  @Input() useNumberPipe = false;

  @Output() onBlurEvent = new EventEmitter<Event>();
  @Output() onInputEvent = new EventEmitter<InputEvent>();
  @Output() onKeyUpEvent = new EventEmitter<Event>();

  private _prevInputValue = '';

  onBlur(event: Event): void {
    this.control.markAsTouched();
    this.onBlurEvent.emit(event);
  }

  onInput(event: any): void {
    if (this.useNumberPipe) this.numberPipe();

    this.onInputEvent.emit(event);
  }

  numberPipe() {
    const inputValue = this.control.value + '';
    const removedCommas = inputValue.replaceAll(',', '');
    if (!isANumber(removedCommas)) {
      this.control.setValue(this._prevInputValue);
      return;
    }
    const transformedValue = this.decimalPipe.transform(removedCommas);
    this.control.setValue(transformedValue);
    this._prevInputValue = transformedValue + '';
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
