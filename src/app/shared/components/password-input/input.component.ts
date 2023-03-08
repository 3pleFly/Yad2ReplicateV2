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
import { ValidationMessages } from '../../models/validation-messages.interface';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationErrorComponent,
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() validationMessages!: ValidationMessages;
  @Input() usePasswordIcon: boolean = false;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() type: string = 'text';

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any) {
    this.control.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  onBlur(event: Event): void {
    this.onTouch();
  }

  updateInputType(type: string) {
    this.type = type;
  }
}
