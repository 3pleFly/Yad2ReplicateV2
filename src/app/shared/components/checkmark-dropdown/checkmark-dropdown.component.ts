import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checkmark, CheckmarkState } from '../../models/checkmark.interface';
import { CheckmarkControlComponent } from '../checkmark-control/checkmark-control.component';
import { LocalisationService } from 'src/app/core/services/localisation.service';

@Component({
  selector: 'app-checkmark-dropdown',
  standalone: true,
  imports: [CommonModule, CheckmarkControlComponent],
  templateUrl: './checkmark-dropdown.component.html',
  styleUrls: ['./checkmark-dropdown.component.css'],
  providers: [LocalisationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckmarkDropdownComponent {
  constructor(private localService: LocalisationService) {}

  @Input() checkmarks!: Checkmark[];
  @Input() title!: Checkmark;

  @Output() checkmarksChange = new EventEmitter<Checkmark[]>();
  @Output() titleChange = new EventEmitter<Checkmark>();

  local = this.localService.main;
  dropdown = false;

  toggleDropdown(e: Event) {
    e.stopPropagation();
    this.dropdown = !this.dropdown;
  }

  private getCurrentMarkState(checkmarks: Checkmark[]) {
    if (this.allMarked(checkmarks)) return 'checked';

    if (this.anyMarked(checkmarks)) return 'indeterminate';
    return 'unchecked';
  }

  toggleAllCheckmarks() {
    let newCheckmarks: Checkmark[];
    let newTitle: Checkmark;
    const state = this.getCurrentMarkState(this.checkmarks);

    switch (state) {
      case 'unchecked':
      case 'indeterminate':
        newCheckmarks = this.markAll('checked');
        newTitle = { ...this.title, state: 'checked' };
        break;

      case 'checked':
        newCheckmarks = this.markAll('unchecked');
        newTitle = { ...this.title, state: 'unchecked' };
        break;
    }
    this.titleChange.emit(newTitle);
    this.checkmarksChange.emit(newCheckmarks);
  }

  countChecked(): number {
    return this.checkmarks.reduce((acc, current) => {
      if (current.state === 'checked') {
        acc++;
      }
      return acc;
    }, 0);
  }

  markAll(state: CheckmarkState): Checkmark[] {
    return this.checkmarks.map((c) => ({
      ...c,
      state: state,
    }));
  }

  allMarked(checkmarks: Checkmark[]) {
    return checkmarks.every((c) => c.state === 'checked');
  }

  anyMarked(checkmarks: Checkmark[]) {
    return checkmarks.some((c) => c.state === 'checked');
  }

  markTitle() {
    if (this.checkmarks.every((c) => c.state === 'checked')) {
      this.title = { ...this.title, state: 'checked' };
    } else if (this.checkmarks.some((c) => c.state === 'checked')) {
      this.title = { ...this.title, state: 'indeterminate' };
    } else {
      this.title = { ...this.title, state: 'unchecked' };
    }
  }

  markCheckbox(index: number) {
    console.log('mark checkbox');

    const checkmark = this.checkmarks[index];
    const state: CheckmarkState =
      checkmark.state === 'checked' ? 'unchecked' : 'checked';

    this.checkmarks[index] = { ...checkmark, state: state };
    this.markTitle();
  }
}
