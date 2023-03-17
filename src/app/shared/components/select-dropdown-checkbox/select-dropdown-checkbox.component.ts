import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { CheckmarkDropdownComponent } from '../checkmark-dropdown/checkmark-dropdown.component';
import { CheckmarkList } from '../../models/checkmark-list.interface';
import { SearchboxService } from '../../../modules/realestate-forsale/services/searchbox.service';

@Component({
  selector: 'app-select-dropdown-checkbox',
  standalone: true,
  imports: [CommonModule, CheckmarkDropdownComponent],
  templateUrl: './select-dropdown-checkbox.component.html',
  styleUrls: ['./select-dropdown-checkbox.component.css'],
  providers: [LocalisationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDropdownCheckboxComponent {
  constructor(private localService: LocalisationService) {}

  localImages = this.localService.images;
  localSearchbox = this.localService.searchbox;
  iconSrc = this.localImages.dropdownArrow;

  @Input() placeholder: string = '';
  @Input() labelName: string = '';
  @Input() checkmarkList!: CheckmarkList[];

  dropdownActive = false;

  toggleDropdown() {
    this.dropdownActive = !this.dropdownActive;
  }

  countCheckmarks() {
    let count = 0;
    this.checkmarkList.forEach((cl) =>
      cl.checkmarks.forEach((cm) => {
        if (cm.state === 'checked') count++;
      })
    );

    return count;
  }

  confirm() {
    this.toggleDropdown();
  }
}
