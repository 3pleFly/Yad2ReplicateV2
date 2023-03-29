import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { ValidationMessages } from '../../models/validation-messages.interface';

@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="(formErrors || controlErrors) && validationMessages">
      <ng-container *ngIf="dirty && touched">
        <ul class="validation_errors">
          <li *ngFor="let error of controlErrors | keyvalue">
            <span>{{ validationMessages[error.key] }}</span>
          </li>
          <li *ngFor="let error of formErrors | keyvalue">
            <span>{{ validationMessages[error.key] }}</span>
          </li>
        </ul>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./validation-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorComponent implements OnInit {
  constructor() {}

  @Input() touched: boolean = false;
  @Input() dirty: boolean = false;
  @Input() validationMessages!: ValidationMessages;
  @Input() formErrors!: ValidationErrors | null;
  @Input() controlErrors!: ValidationErrors | null;

  ngOnInit(): void {}
}
