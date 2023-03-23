import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { PublishRealestateService } from '../../services/publish-realestate.service';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseStep, useExisting: Step7Component }],
})
export class Step7Component extends BaseStep {
  constructor(realestateService: PublishRealestateService, stepData: StepData) {
    super(realestateService, stepData);
  }
}
