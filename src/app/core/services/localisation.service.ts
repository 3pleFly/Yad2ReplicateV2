import { Injectable } from '@angular/core';
import { auth } from 'src/assets/localization/auth';
import { errors } from 'src/assets/localization/errors';
import { images } from 'src/assets/localization/images';
import { navigation } from 'src/assets/localization/navigation';
import { searchbox } from 'src/assets/localization/searchbox';
import { siteLogo } from 'src/assets/localization/main';
import { checkboxDropdownArrow } from 'src/assets/localization/main';
import { propertyTypes } from 'src/assets/localization/property-types';
import { publish } from 'src/assets/localization/publish';

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  constructor() {}

  get auth() {
    return auth;
  }

  get publish() {
    return publish;
  }

  get errors() {
    return errors;
  }

  get images() {
    return images;
  }

  get navigation() {
    return navigation;
  }

  get searchbox() {
    return searchbox;
  }

  get propertyTypes() {
    return propertyTypes;
  }

  get main() {
    return { siteLogo, dropdownArrow: checkboxDropdownArrow };
  }
}
