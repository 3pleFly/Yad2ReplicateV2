import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checkmark } from '../../models/checkmark.interface';

@Component({
  selector: 'app-checkmark-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>
      <input
        #checkbox
        [indeterminate]="checkmark.state === 'indeterminate'"
        [ngClass]="{
          input: true,
          'indeterminate-icon': checkbox.indeterminate
        }"
        type="checkbox"
        [checked]="checkmark.state === 'checked'"
        (click)="mark(checkbox.checked, $event)"
      />
      <span>{{ checkmark.name }}</span>
    </label>
  `,
  styleUrls: ['./checkmark-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckmarkControlComponent {
  @Input() checkmark!: Checkmark;
  @Output() marked = new EventEmitter<boolean>();

  mark(checked: boolean, e: Event) {
    this.marked.emit();
  }
}
