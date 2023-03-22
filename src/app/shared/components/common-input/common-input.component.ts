import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredAsteriskPipe } from '../../pipes/required-asterisk.pipe';

@Component({
  selector: 'app-common-input',
  standalone: true,
  template: `
    <label>
      <div>{{ labelName | requiredAsterisk : required }}</div>
      <input
        [disabled]="disabled"
        [readonly]="readonly"
        [placeholder]="placeholder"
        class="common_input"
        type="text"
      />
    </label>
  `,
  styleUrls: ['./common-input.component.css'],
  imports: [CommonModule, RequiredAsteriskPipe],
})
export class CommonInputComponent {
  constructor() {}

  @Input() placeholder!: string;
  @Input() labelName!: string;
  @Input() readonly!: boolean;
  @Input() required = false;
  @Input() disabled = false;
}
