import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { RangedSelect } from 'src/app/shared/models/ranged-select.interface';
import { SearchboxService } from '../../services/searchbox.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  providers: [LocalisationService, SearchboxService],
  styleUrls: ['./search-box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  constructor(
    private localService: LocalisationService,
    private searchboxService: SearchboxService
  ) {}

  local = this.localService.searchbox;
  checkmarkList = this.searchboxService.checkmarkList;
  roomsDropdown = false;
  roomsRange: RangedSelect = { from: 0, to: 'all' };
  roomsPlaceholder = this.local.placeholder_rooms;
  faSearch = faSearch;
  faCirclePlus = faCirclePlus;
  faBell = faBell;

  roomsRangeReducer(roomsSelection: RangedSelect) {
    this.roomsRange = { ...roomsSelection };
    this.roomsPlaceholder = this.roomsPlaceholderReducer(roomsSelection);
  }

  roomsPlaceholderReducer(roomsSelection: RangedSelect): string {
    if (roomsSelection.from === 'all' && roomsSelection.to === 'all')
      return this.local.placeholder_rooms;

    if (roomsSelection.from !== 'all' && roomsSelection.to !== 'all') {
      return `${roomsSelection.from} - ${roomsSelection.to}`;
    }

    if (roomsSelection.to === 'all') {
      return `מ-${roomsSelection.from}`;
    }

    if (roomsSelection.from === 'all') {
      return `עד-${roomsSelection.to}`;
    }

    return this.local.placeholder_rooms;
  }

  toggleRoomsDropdown() {
    this.roomsDropdown = !this.roomsDropdown;
  }
}
