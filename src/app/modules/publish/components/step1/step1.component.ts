import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { RealestateDataService } from '../../services/publish-realestate.service';
import { RealestateFormService } from '../../services/realestate-form-data.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1Component extends BaseStep {
  constructor(
    private localService: LocalisationService,
    realestateService: RealestateDataService,
    formData: RealestateFormService,
    stepData: StepData
  ) {
    super(realestateService, stepData, formData);
  }

  local = this.localService.publish;
  images = this.localService.images.publish.step1;

  setListingCategory(listingCategoryId: number) {
    this.setFormData({ boardId: 1, listingId: listingCategoryId });
    this.nextStep();
  }

  emitPrevStep(prevStep: number) {
    this.prevStep();
  }
}
