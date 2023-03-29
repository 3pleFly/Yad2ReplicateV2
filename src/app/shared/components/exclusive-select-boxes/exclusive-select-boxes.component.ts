import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exclusive-select-boxes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="label">{{ label }}</span>
    <ul class="options">
      <li
        (click)="markSelection(option)"
        [ngClass]="{ selected: selectedOption === option }"
        *ngFor="let option of options"
      >
        {{ option }}
      </li>
    </ul>
  `,
  styleUrls: ['./exclusive-select-boxes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExclusiveSelectBoxesComponent {
  @Input() options!: string[];
  @Input() label: string = '';

  @Input()
  get selectedOption(): string {
    return this._selectedOption;
  }
  set selectedOption(option: string) {
    this._selectedOption = option;
    this.select.emit(option);
  }
  private _selectedOption!: string;

  @Output() select = new EventEmitter<string>();

  markSelection(option: string) {
    this.selectedOption = option;
    this.select.emit(option);
  }
}
