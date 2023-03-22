import { Injectable } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { IMultipleSelectBox } from 'src/app/shared/models/imultiple-select-box.interface';
import { ProgressBarMessage } from 'src/app/shared/models/progress-bar-message.interface';
import { Step1Component } from '../components/step1/step1.component';
import { Step2Component } from '../components/step2/step2.component';
import { Step3Component } from '../components/step3/step3.component';
import { Step4Component } from '../components/step4/step4.component';
import { Step5Component } from '../components/step5/step5.component';
import { Step6Component } from '../components/step6/step6.component';
import { Step7Component } from '../components/step7/step7.component';

@Injectable()
export class PublishRealestateService {
  constructor(private localService: LocalisationService) {}
  local = this.localService.publish;
  propertyFeatures = this.localService.propertyFeatures;
  propertyFeatureImages = this.localService.images.propertyFeatures;
  currentStep = 4;

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

  get propertyFeatureMultipleSelectBoxes(): IMultipleSelectBox[] {
    return [
      {
        checkmark: { name: this.propertyFeatures.ac, state: 'unchecked' },
        imgSrc: this.propertyFeatureImages.ac,
      },
      {
        checkmark: {
          name: this.propertyFeatures.accessability,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.accessability,
      },
      {
        checkmark: { name: this.propertyFeatures.elevator, state: 'unchecked' },
        imgSrc: this.propertyFeatureImages.elevator,
      },
      {
        checkmark: {
          name: this.propertyFeatures.roommates,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.roommates,
      },
      {
        checkmark: {
          name: this.propertyFeatures.furnished,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.furnished,
      },
      {
        checkmark: {
          name: this.propertyFeatures.kosherKitchen,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.kosherKitchen,
      },
      {
        checkmark: { name: this.propertyFeatures.mamad, state: 'unchecked' },
        imgSrc: this.propertyFeatureImages.mamad,
      },
      {
        checkmark: { name: this.propertyFeatures.pets, state: 'unchecked' },
        imgSrc: this.propertyFeatureImages.pets,
      },
      {
        checkmark: {
          name: this.propertyFeatures.renovated,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.renovated,
      },
      {
        checkmark: { name: this.propertyFeatures.storage, state: 'unchecked' },
        imgSrc: this.propertyFeatureImages.storage,
      },
      {
        checkmark: {
          name: this.propertyFeatures.tadiranAc,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.tadiranAc,
      },
      {
        checkmark: { name: this.propertyFeatures.unit, state: 'unchecked' },
        imgSrc: this.propertyFeatureImages.unit,
      },
      {
        checkmark: {
          name: this.propertyFeatures.waterHeating,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.waterHeating,
      },
      {
        checkmark: {
          name: this.propertyFeatures.windowBars,
          state: 'unchecked',
        },
        imgSrc: this.propertyFeatureImages.windowBars,
      },
    ];
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
