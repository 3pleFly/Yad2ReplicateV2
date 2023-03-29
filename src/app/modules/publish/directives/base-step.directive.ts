import { Directive } from '@angular/core';
import { StepData } from '../models/step-data.interface';
import { RealestateFormStep } from '../models/yad2-form-data.interface';
import { RealestateDataService } from '../services/publish-realestate.service';
import { RealestateFormService } from '../services/realestate-form-data.service';

@Directive()
export abstract class BaseStep {
  constructor(
    protected realestateData: RealestateDataService,
    protected stepData: StepData,
    protected realestateFormService: RealestateFormService
  ) {}

  nextStep() {
    this.realestateData.nextStep();
  }

  prevStep() {
    this.realestateData.prevStep();
  }

  getFormData() {
    return this.realestateFormService.getFormData(this.stepData.index - 1);
  }

  setFormData(stepFormData: RealestateFormStep) {
    const key = `step${this.stepData.index}`;
    this.realestateFormService.setFormData(key, stepFormData);
  }
}
