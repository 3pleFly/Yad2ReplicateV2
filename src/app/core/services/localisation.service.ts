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
import { propertyStates } from 'src/assets/localization/property-states';
import { propertyFeaturesImgSrcs, propertyFeaturesLocalisation } from 'src/assets/localization/property-features';
import { realestate } from 'src/assets/localization/realestate';
import { recentlySoldBox } from 'src/assets/localization/recently-sold-box';
import { TranslationType } from 'src/app/shared/models/translation-type.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  constructor() {}

  getTranslation(value: string) {}

  get auth() {
    return auth;
  }

  get recentlySoldBox() {
    return recentlySoldBox;
  }

  get publish() {
    return publish;
  }

  get realestate() {
    return realestate;
  }

  get errors() {
    return errors;
  }

  get images() {
    return images;
  }

  get propertyFeaturesImgSrcs() {
    return propertyFeaturesImgSrcs;
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

  get y2Translatables(): TranslationType {
    return { ...propertyTypes, ...propertyStates, ...this.propertyFeatures };
  }

  get propertyFeatures() {
    return propertyFeaturesLocalisation;
  }

  get allPropertyTypes() {
    return [
      propertyTypes['apartment'],
      propertyTypes['garden_apartment'],
      propertyTypes['privateHouseOrCottege'],
      propertyTypes['roofOrPenthouse'],
      propertyTypes['lots'],
      propertyTypes['duplex'],
      propertyTypes['vacation_apartment'],
      propertyTypes['townhouse'],
      propertyTypes['basement'],
      propertyTypes['triplex'],
      propertyTypes['unit'],
      propertyTypes['agricultural_farm'],
      propertyTypes['farm'],
      propertyTypes['assisted_living'],
      propertyTypes['building'],
      propertyTypes['studio'],
      propertyTypes['storage'],
      propertyTypes['parking'],
      propertyTypes['purchasingGroup'],
      propertyTypes['general'],
    ];
  }

  get propertyStates() {
    return propertyStates;
  }

  get main() {
    return {
      siteLogo,
      dropdownArrow: checkboxDropdownArrow,
      dropdownArrowLight: this.images.dropdownArrowLight,
      markSelected: this.images.markSelected,
    };
  }
}
