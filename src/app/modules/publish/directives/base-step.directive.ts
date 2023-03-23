import { Directive } from '@angular/core';
import { StepData } from '../models/step-data.interface';
import { PublishRealestateService } from '../services/publish-realestate.service';

@Directive()
export class BaseStep {
  constructor(
    protected realestateService: PublishRealestateService,
    protected stepData: StepData
  ) {}

  nextStep() {
    this.realestateService.nextStep();
  }

  prevStep() {
    this.realestateService.prevStep();
  }
}
