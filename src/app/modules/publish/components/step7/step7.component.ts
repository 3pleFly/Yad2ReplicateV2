import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { Trial } from '../../models/trial-traits.interface';
import { RealestateDataService } from '../../services/publish-realestate.service';
import { RealestateFormService } from '../../services/realestate-form-data.service';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step7Component extends BaseStep {
  constructor(
    realestateService: RealestateDataService,
    stepData: StepData,
    formData: RealestateFormService,
    private localService: LocalisationService
  ) {
    super(realestateService, stepData, formData);
  }

  local = this.localService.publish;

  advertisementTypeId: number | null = null;

  trials = this.realestateData.step7Trials;

  extraHighlightedBoldTraits = [{ 1: 1 }];

  acceptAdsCheckmark: Checkmark = this.realestateData.acceptAdsCheckmarkStep7;

  submit() {
    if (this.advertisementTypeId) {
      this.setFormData({ advertisementTypeId: this.advertisementTypeId });
      this.realestateFormService.submitForm();
    }
  }

  onSelectTrial(trial: Trial) {
    this.advertisementTypeId = trial.advertisementTypeId;
    this.submit();
  }
}
