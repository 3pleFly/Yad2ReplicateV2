import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { PublishRealestateService } from '../../services/publish-realestate.service';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseStep, useExisting: Step5Component }],
})
export class Step5Component extends BaseStep {
  constructor(realestateService: PublishRealestateService, stepData: StepData) {
    super(realestateService, stepData);

  }
}
