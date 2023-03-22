import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Yad2Board } from '../../models/board.type';
import { RealestateCategory } from '../../models/realestate-category.type';
import { PublishRealestateService } from '../../services/publish-realestate.service';
import { Step1Component } from '../step1/step1.component';

@Component({
  selector: 'app-publish-realestate',
  templateUrl: './publish-realestate.component.html',
  styleUrls: ['./publish-realestate.component.css'],
  providers: [PublishRealestateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishRealestateComponent {
  constructor(private realestateService: PublishRealestateService) {}

  sevenSteps = this.realestateService.sevenSteps;

  step1 = Step1Component

  formData = {};

  setYad2Board(board: Yad2Board) {
    switch (board) {
      case 'realestate':
        this.activateRealestateBoardForm();
        break;

      default:
        return;
    }
  }

  get values() {
    return Object.values(this.sevenSteps);
  }

  setRealestateCategory(category: RealestateCategory) {
    switch (category) {
      case 'sale':
        return this.activateRealestateForSaleForm();

      default:
        return;
    }
  }

  activateRealestateBoardForm() {
    this.realestateService.initializeRealestateSteps();
  }

  activateRealestateForSaleForm() {
    this.realestateService.nextStep();
  }

  onPrevStep(prevStep: number) {
    console.log(prevStep);

    this.realestateService.goBackToStep(prevStep);
  }

  onNextStep(values: any) {
    this.formData = { ...this.formData, values };
    console.log('new form data', this.formData);
    this.realestateService.nextStep();
  }

  get CurrentStep() {
    return this.realestateService.currentStep;
  }
}
