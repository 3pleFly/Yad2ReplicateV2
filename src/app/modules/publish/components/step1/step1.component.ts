import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { PublishRealestateService } from '../../services/publish-realestate.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1Component {
  constructor(
    private localService: LocalisationService,
    private realestateService: PublishRealestateService,
    protected stepData: StepData
  ) {}

  local = this.localService.publish;
  images = this.localService.images.publish.step1;

  onForsaleCategory() {
    this.realestateService.nextStep();
  }

  emitPrevStep(prevStep: number) {
    this.realestateService.prevStep();
  }
}
