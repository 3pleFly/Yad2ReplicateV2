import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMultipleSelectBox } from '../../models/imultiple-select-box.interface';

@Component({
  selector: 'app-multiple-select-boxes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="label_text">{{ label }}</span>
    <ul class="boxes">
      <li
        (click)="markSelection(option)"
        [ngClass]="{ selected: option.checkmark.state === 'checked' }"
        *ngFor="let option of options"
      >
        <img [src]="option.imgSrc" />
        <span>
          {{ option.checkmark.name }}
        </span>
      </li>
    </ul>
  `,
  styleUrls: ['./multiple-select-boxes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleSelectBoxesComponent {
  @Input() options!: IMultipleSelectBox[];
  @Input() label: string = '';

  @Output() optionsChange = new EventEmitter<IMultipleSelectBox[]>();

  markSelection(box: IMultipleSelectBox) {
    box.checkmark.state =
      box.checkmark.state === 'checked' ? 'unchecked' : 'checked';

    this.optionsChange.emit([...this.options]);
  }
}
