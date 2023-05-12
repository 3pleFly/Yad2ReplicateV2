import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckmarkList } from '../../models/checkmark-list.interface';
import { CheckmarkControlComponent } from '../checkmark-control/checkmark-control.component';
import { Checkmark } from '../../models/checkmark.interface';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-list-dropdown',
  standalone: true,
  imports: [CommonModule, CheckmarkControlComponent],
  template: `
    <ul class="list">
      <li>
        <app-checkmark-control
          [checkmark]="allPropertyTypesCheckmark"
          [control]="allPropertyTypesControl"
          [dirty]="allPropertyTypesControl.dirty"
          [touched]="allPropertyTypesControl.touched"
        ></app-checkmark-control>
      </li>
      <li *ngFor="let checkmarkList of checkmarkLists">
        <app-checkmark-control

        ></app-checkmark-control>
      </li>
      <li>
        <button class="text-btn select_btn">{{ selectText }}</button>
      </li>
    </ul>
  `,
  styleUrls: ['./checkbox-list-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListDropdownComponent {
  localService = inject(LocalisationService);
  local = this.localService.propertyTypes;
  @Input() checkmarkLists!: CheckmarkList[];

  allPropertyTypesCheckmark: Checkmark = {
    name: this.local['select_allTypes'],
    state: 'unchecked',
  };
  allPropertyTypesControl = new FormControl(false);

  selectText = this.local['select'];
}
