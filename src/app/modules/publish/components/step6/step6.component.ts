import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { PublishRealestateService } from '../../services/publish-realestate.service';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseStep, useExisting: Step6Component }],
})
export class Step6Component extends BaseStep {
  constructor(realestateService: PublishRealestateService, override stepData: StepData) {
    super(realestateService);
  }
}
