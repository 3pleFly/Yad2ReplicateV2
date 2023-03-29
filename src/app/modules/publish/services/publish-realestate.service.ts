import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs';
import { PropertyFeatures } from 'src/app/core/models/property-features.interface';
import { Yad2Response } from 'src/app/core/models/yad2-response.interface';
import { Yad2Resource } from 'src/app/core/models/yad2resource.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { IMultipleSelectBox } from 'src/app/shared/models/imultiple-select-box.interface';
import { ProgressBarMessage } from 'src/app/shared/models/progress-bar-message.interface';
import { TranslationType } from 'src/app/shared/models/translation-type.interface';
import { Step1Component } from '../components/step1/step1.component';
import { Step2Component } from '../components/step2/step2.component';
import { Step3Component } from '../components/step3/step3.component';
import { Step4Component } from '../components/step4/step4.component';
import { Step5Component } from '../components/step5/step5.component';
import { Step6Component } from '../components/step6/step6.component';
import { Step7Component } from '../components/step7/step7.component';
import { Trial } from '../models/trial-traits.interface';

@Injectable()
export class RealestateDataService {
  constructor(
    private localService: LocalisationService,
    private apiRequestService: ApiRequestService
  ) {}
  local = this.localService.publish;
  images = this.localService.images.publish;
  propertyFeatureImages = this.localService.images.propertyFeatures;
  currentStep = 1;

  initializeRealestateSteps() {
    this.currentStep = 1;
  }

  nextStep() {
    this.currentStep = this.currentStep + 1;
  }

  prevStep() {
    this.currentStep = this.currentStep - 1;
  }

  goBackToStep(num: number) {
    this.currentStep = num;
  }

  getPropertyFeaturesIdsByNames(propertyFeatureNames: string[]): number[] {
    const propertyFeatures: number[] = [];

    const properyFeaturesMap: { [key: string]: number } = {};

    this.propertyFeatures.forEach(
      (pf) => (properyFeaturesMap[pf.name] = pf.id)
    );

    propertyFeatureNames.forEach((name) => {
      if (properyFeaturesMap[name] !== undefined) {
        propertyFeatures.push(properyFeaturesMap[name]);
      }
    });

    return propertyFeatures;
  }

  getPropertyTypeByName(propertyTypeName: string) {
    const propertyType = this.propertyTypes.find(
      (pt) => pt.name === propertyTypeName
    );
    if (propertyType) return propertyType;

    throw new Error('Property type not found: ' + propertyTypeName);
  }

  getPropertyStateByName(propertyStateName: string) {
    const propertyState = this.propertyStates.find(
      (ps) => ps.name === propertyStateName
    );
    if (propertyState) return propertyState;

    throw new Error('Property state not found: ' + propertyStateName);
  }

  propertyStatesOptions$ = this.apiRequestService.getPropertyStates().pipe(
    tap((r) => (this.propertyStates = r)),
    map((r) => r.map((r) => r.name))
  );

  propertyTypesOptions$ = this.apiRequestService.getPropertyTypes().pipe(
    tap((r) => (this.propertyTypes = r)),
    map((r) => r.map((r) => r.name))
  );

  propertyFeaturesOptions$ = this.apiRequestService.getPropertyFeatures().pipe(
    tap((r) => (this.propertyFeatures = r)),
    map((r) => r.map((r) => r.name))
  );

  propertyStates!: Yad2Resource[];
  propertyTypes!: Yad2Resource[];
  propertyFeatures!: Yad2Resource[];

  get propertyFeatureImgSrcs(): PropertyFeatures {
    return {
      AC: this.propertyFeatureImages.ac,
      Accessability: this.propertyFeatureImages.accessability,
      WindowBars: this.propertyFeatureImages.windowBars,
      WaterHeating: this.propertyFeatureImages.waterHeating,
      Elevator: this.propertyFeatureImages.elevator,
      Roommates: this.propertyFeatureImages.roommates,
      Furniture: this.propertyFeatureImages.furnished,
      Unit: this.propertyFeatureImages.unit,
      KosherKitchen: this.propertyFeatureImages.kosherKitchen,
      Pets: this.propertyFeatureImages.pets,
      Renovated: this.propertyFeatureImages.renovated,
      Mamad: this.propertyFeatureImages.mamad,
      TadiranAC: this.propertyFeatureImages.tadiranAc,
      Storage: this.propertyFeatureImages.storage,
    };
  }

  get step7Trials() {
    return {
      basic: {
        advertisementTypeId: 1,
        name: this.local.step7_basic_header,
        traits: [
          { name: this.local.step7_basic_prop1, polarity: 'positive' },
          { name: this.local.step7_basic_prop2, polarity: 'positive' },
          { name: this.local.step7_basic_prop3, polarity: 'negative' },
        ],
        price: 0,
        duration: 0,
        isReccommended: false,
        imgSrc: this.images.step7.kiteSvg,
      } as Trial,
      extraHighlighted: {
        advertisementTypeId: 3,
        name: this.local.step7_extraHighlighted_header,
        traits: [
          {
            name: this.local.step7_extraHighlighted_prop1,
            polarity: 'positive',
          },
          {
            name: this.local.step7_extraHighlighted_prop2,
            polarity: 'positive',
          },
          {
            name: this.local.step7_extraHighlighted_prop3,
            polarity: 'positive',
          },
          {
            name: this.local.step7_extraHighlighted_prop4,
            polarity: 'positive',
          },
        ],
        price: 259,
        duration: 60,
        isReccommended: true,
        imgSrc: this.images.step7.rocketSvg,
      } as Trial,
      highlighted: {
        advertisementTypeId: 2,
        name: this.local.step7_highlighted_header,
        traits: [
          { name: this.local.step7_highlighted_prop1, polarity: 'positive' },
          { name: this.local.step7_highlighted_prop2, polarity: 'positive' },
          { name: this.local.step7_highlighted_prop3, polarity: 'positive' },
        ],
        price: 199,
        duration: 28,
        isReccommended: false,
        imgSrc: this.images.step7.rocketSvg,
      } as Trial,
    };
  }

  get acceptAdsCheckmarkStep7(): Checkmark {
    return {
      name: this.local.step7_label_checkmarkAcceptAds,
      state: 'unchecked',
    };
  }

  get acceptTermsCheckmark(): Checkmark {
    return {
      name: this.local.step6_label_checkboxAcceptsTermsAndPrivacy1,
      state: 'unchecked',
    };
  }

  get emailAdsCheckmark(): Checkmark {
    return {
      name: this.local.step6_label_checkboxRecieveUpdatesOverEmail,
      state: 'unchecked',
    };
  }

  get useVirtualNumberCheckmark(): Checkmark {
    return {
      name: this.local.step6_label_checkboxVirtualNumber,
      state: 'unchecked',
    };
  }

  get allowWeekendCallsCheckmark(): Checkmark {
    return {
      name: this.local.step6_label_checkboxReceiveCallsOverWeekend,
      state: 'unchecked',
    };
  }

  get immediateEntryCheckmark(): Checkmark {
    return {
      name: this.local.step4_label_checkboxImmediateEntry,
      state: 'unchecked',
    };
  }

  get flexibleEntryCheckmark(): Checkmark {
    return {
      name: this.local.step4_label_checkboxFlexibleEntryDate,
      state: 'unchecked',
    };
  }

  get descriptionTextAreaProgressBarMessages(): ProgressBarMessage[] {
    return [
      {
        message: this.local.step3_fillbar_message1,
        minLength: 0,
        maxLength: 2,
      },
      {
        message: this.local.step3_fillbar_message2,
        minLength: 3,
        maxLength: 29,
      },
      {
        message: this.local.step3_fillbar_message3,
        minLength: 30,
        maxLength: 99,
      },
      {
        message: this.local.step3_fillbar_message4,
        minLength: 100,
        maxLength: 999,
      },
    ];
  }

  get tlvContractCheckmark(): Checkmark {
    return { name: this.local.step3_label_contract, state: 'unchecked' };
  }

  get sevenSteps() {
    return {
      step1: {
        previewTitle: this.local.step1_titlePreview,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 1,
        component: Step1Component,
      },
      step2: {
        previewTitle: this.local.step2_titlePreview,
        showcaseTitle: this.local.step2_titleShowcase,
        index: 2,
        component: Step2Component,
      },
      step3: {
        previewTitle: this.local.step3_titlePreview,
        showcaseTitle: this.local.step3_titleShowcase,
        index: 3,
        component: Step3Component,
      },
      step4: {
        previewTitle: this.local.step4_titlePreview,
        showcaseTitle: this.local.step4_titleShowcase,
        index: 4,
        component: Step4Component,
      },
      step5: {
        previewTitle: this.local.step5_titlePreview,
        showcaseTitle: this.local.step5_titleShowcase,
        index: 5,
        component: Step5Component,
      },
      step6: {
        previewTitle: this.local.step6_titlePreview,
        showcaseTitle: this.local.step6_titleShowcase,
        index: 6,
        component: Step6Component,
      },
      step7: {
        previewTitle: this.local.step7_titleShowcase,
        showcaseTitle: this.local.step7_titleShowcase,
        index: 7,
        component: Step7Component,
      },
    };
  }
}
