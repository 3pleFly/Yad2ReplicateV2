import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { RealestateDataService } from '../../services/publish-realestate.service';
import { RealestateFormService } from '../../services/realestate-form-data.service';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step5Component extends BaseStep{
  constructor(
    realestateService: RealestateDataService,
    stepData: StepData,
    formData: RealestateFormService,
    private localService: LocalisationService
  ) {
    super(realestateService, stepData, formData);
  }

  local = this.localService.publish;

}
