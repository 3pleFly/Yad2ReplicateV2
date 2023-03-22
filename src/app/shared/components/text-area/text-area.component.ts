import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label class="label">
      <span class="label_text">{{ label }}</span>
      <div class="counter">{{ progress }}/{{ counterSum }}</div>
      <div class="textarea">
        <textarea
          (keyup)="onKeyUp()"
          (blur)="onBlur()"
          [(ngModel)]="textAreaValue"
          [placeholder]="placeholder"
        ></textarea>
      </div>
    </label>
  `,
  styleUrls: ['./text-area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
  constructor() {}

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() counterSum: number = 0;

  @Output() blurTextArea = new EventEmitter<string>();

  progress = 0;
  textAreaValue = '';

  onBlur() {
    this.blurTextArea.emit(this.textAreaValue);
  }

  onKeyUp() {
    this.progress = this.textAreaValue.length;
  }
}
