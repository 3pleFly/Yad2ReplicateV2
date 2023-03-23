import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PublishRealestateService } from '../../services/publish-realestate.service';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseStep, useExisting: Step4Component }],
})
export class Step4Component extends BaseStep {
  constructor(realestateService: PublishRealestateService, stepData: StepData) {
    super(realestateService, stepData);
    this.stepData = stepData;
  }


}
