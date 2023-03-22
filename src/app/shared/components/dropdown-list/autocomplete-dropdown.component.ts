import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormControlComponent } from '../form-control/form-control.component';
import { BoldSubStringPipe } from '../../pipes/bold-substring.pipe';

@Component({
  selector: 'app-autocomplete-dropdown',
  standalone: true,
  imports: [CommonModule, FormControlComponent, BoldSubStringPipe],
  template: `
    <app-form-control
      [control]="control"
      [placeholder]="placeholder"
      [label]="label"
      (onKeyUpEvent)="onKeyUp($event)"
      [required]="required"
    ></app-form-control>

    <ul class="dropdown_list">
      <ng-container *ngIf="control.valueChanges | async as inputValue">
        <li
          *ngFor="let item of dataList"
          (mousedown)="emitSelectedItem(item)"
          [innerHTML]="item | boldSubString : inputValue"
        ></li>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./autocomplete-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDropdownComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() required = false;
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() dataList!: string[] | null;
  @Output() controlValueChange = new EventEmitter<string>();
  private userSelectedFromDropdown = false;

  emitSelectedItem(item: string) {
    this.controlValueChange.emit(item);
    this.control.setValue(item);
    this.userSelectedFromDropdown = true;
    this.dataList = [];
  }

  @HostListener('focusout')
  clearInput(e: Event) {
    if (this.userSelectedFromDropdown) {
      return;
    }
    this.control.setValue('');
    this.controlValueChange.emit('');
  }

  onKeyUp(e: Event) {
    this.userSelectedFromDropdown = false;
  }
}
