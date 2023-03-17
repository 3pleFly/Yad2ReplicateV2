import { Injectable } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { SevenSteps } from '../models/seven-steps-interface';


@Injectable()
export class PublishRealestateService {
  constructor(private localService: LocalisationService) {}
  local = this.localService.publish;
  _currentStep = 0;


  set currentStep(value: number) {
    this._currentStep = value;
  }

  get currentStep() {
    return this._currentStep;
  }

  get sevenSteps(): SevenSteps {
    return {
      step1: {
        previewTitle: this.local.step1_titlePreview,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 1,
      },
      step2: {
        previewTitle: this.local.step2_titlePreview,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 2,
      },
      step3: {
        previewTitle: this.local.step3_titlePreview,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 3,
      },
      step4: {
        previewTitle: this.local.step4_titlePreview,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 4,
      },
      step5: {
        previewTitle: this.local.step5_titlePreview,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 5,
      },
      step6: {
        previewTitle: this.local.step6_titlePreview,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 6,
      },
      step7: {
        previewTitle: this.local.step7_titleShowcase,
        showcaseTitle: this.local.step1_titleShowcase,
        index: 7,
      },
    };
  }
}
