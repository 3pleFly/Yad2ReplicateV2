import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressBarMessage } from '../../models/progress-bar-message.interface';

@Component({
  selector: 'app-text-area-fillbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-area-fillbar.component.html',
  styleUrls: ['./text-area-fillbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaFillbarComponent {
  @Input() label: string = '';
  @Input() fillbarSum: number = 0;
  @Input() placeholder: string = '';
  @Input() messages!: ProgressBarMessage[];
  @Input() bottomCaption: string = '';

  @Output() inputEvent = new EventEmitter<string>();

  fillbarProgress = 0;
  textAreaValue: string = '';

  onInput() {
    this.fillbarProgress = this.textAreaValue.length;
    this.inputEvent.emit(this.textAreaValue);
  }

  get progressBarMessage() {
    const message = this.messages.find(
      (m) =>
        this.fillbarProgress >= m.minLength &&
        this.fillbarProgress <= m.maxLength
    );

    return message ? message.message : '';
  }

  get fillBarWidth() {
    return this.fillbarProgress === 0 ? 100 + '%' : this.fillbarProgress + '%';
  }
}
