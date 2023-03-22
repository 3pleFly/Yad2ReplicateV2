import { Directive, Input } from '@angular/core';
import { IStep } from '../models/istep.interface';
import { StepData } from '../models/step-data.interface';
import { PublishRealestateService } from '../services/publish-realestate.service';

@Directive()
export class BaseStep implements IStep {
  constructor(protected realestateService: PublishRealestateService) {}

  @Input() stepData!: StepData;
  @Input() currentStep!: number;

  nextStep() {
    this.realestateService.nextStep();
  }

  prevStep() {
    this.realestateService.prevStep();
  }
}
