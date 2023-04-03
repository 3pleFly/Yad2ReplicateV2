import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checkmark } from '../../models/checkmark.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessages } from '../../models/validation-messages.interface';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'app-checkmark-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorComponent],
  template: `
    <label [ngClass]="{ disabled: disabled }">
      <input
        [formControl]="control"
        [indeterminate]="checkmark.state === 'indeterminate'"
        [ngClass]="{
          input: true,
          'indeterminate-icon': checkbox.indeterminate
        }"
        [checked]="checkmark.state === 'checked'"
        type="checkbox"
        #checkbox
      />
      <ng-container
        [ngTemplateOutlet]="label ? label : defaultLabel"
      ></ng-container>
      <ng-container [ngTemplateOutlet]="icon"></ng-container>
      <ng-template #defaultLabel>
        <span>
          {{ checkmark.name }}
        </span>
      </ng-template>
    </label>
    <ng-container [ngTemplateOutlet]="caption"></ng-container>
    <app-validation-error
      [controlErrors]="control.errors"
      [touched]="touched"
      [dirty]="dirty"
      [validationMessages]="validationMessages"
    ></app-validation-error>
  `,
  styleUrls: ['./checkmark-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckmarkControlComponent implements OnInit {
  @Input() dirty = false;
  @Input() touched = false;
  @Input() disabled = false;
  @Input() checkmark!: Checkmark;
  @Input() control: FormControl = new FormControl();
  @Input() validationMessages: ValidationMessages = {};

  @Output() checkmarkChange = new EventEmitter<Checkmark>();

  @ContentChild('label') label!: TemplateRef<any>;
  @ContentChild('caption') caption!: TemplateRef<any>;
  @ContentChild('icon') icon!: TemplateRef<any>;

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  mark(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    console.log('inside control', this.checkmark.state);

    const state = this.checkmark.state === 'checked' ? 'unchecked' : 'checked';
    const newCheckmark = { ...this.checkmark, state } as Checkmark;
    this.checkmark = newCheckmark;

    this.checkmarkChange.emit(newCheckmark);
  }
}
