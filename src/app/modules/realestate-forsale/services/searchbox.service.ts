import { Injectable } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { CheckmarkList } from '../../../shared/models/checkmark-list.interface';

@Injectable()
export class SearchboxService {
  constructor(private localService: LocalisationService) {}

  local = this.localService.propertyTypes;

  get checkmarkList(): CheckmarkList[] {
    return [
      {
        title: { name: this.local['select_apartments'], state: 'unchecked' },
        checkmarks: [
          { name: this.local['apartment'], state: 'unchecked' },
          { name: this.local['garden_apartment'], state: 'unchecked' },
          { name: this.local['roofOrPenthouse'], state: 'unchecked' },
          { name: this.local['duplex'], state: 'unchecked' },
          { name: this.local['vacation_apartment'], state: 'unchecked' },
          { name: this.local['basement'], state: 'unchecked' },
          { name: this.local['triplex'], state: 'unchecked' },
          { name: this.local['unit'], state: 'unchecked' },
          { name: this.local['studio'], state: 'unchecked' },
        ],
      },
      {
        title: { name: this.local['select_houses'], state: 'unchecked' },
        checkmarks: [
          { name: this.local['privateHouseOrCottege'], state: 'unchecked' },
          { name: this.local['townhouse'], state: 'unchecked' },
          { name: this.local['agricultural_farm'], state: 'unchecked' },
          { name: this.local['farm'], state: 'unchecked' },
        ],
      },
      {
        title: { name: this.local['select_moreTypes'], state: 'unchecked' },
        checkmarks: [
          { name: this.local['lots'], state: 'unchecked' },
          { name: this.local['assisted_living'], state: 'unchecked' },
          { name: this.local['building'], state: 'unchecked' },
          { name: this.local['storage'], state: 'unchecked' },
          { name: this.local['parking'], state: 'unchecked' },
          { name: this.local['purchasingGroup'], state: 'unchecked' },
          { name: this.local['general'], state: 'unchecked' },
        ],
      },
    ];
  }
}
