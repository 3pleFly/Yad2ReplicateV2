import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { StepContainerComponent } from '../step-container/step-container.component';
import { PublishRealestateService } from '../../services/publish-realestate.service';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseStep, useExisting: Step3Component }],
})
export class Step3Component extends BaseStep {
  constructor(
    private localService: LocalisationService,
    realestateService: PublishRealestateService,
    override stepData: StepData
  ) {
    super(realestateService);
  }

  local = this.localService.publish;
  telAvivSvg = this.localService.images.outsource.telaviv;
  tlvContractCheckmark: Checkmark = this.realestateService.tlvContractCheckmark;
  propertyFeaturesBoxes =
    this.realestateService.propertyFeatureMultipleSelectBoxes;
  textAreaProgressBarMessage =
    this.realestateService.descriptionTextAreaProgressBarMessages;

  form = new FormGroup({
    rooms: new FormControl<string>(''),
    parking: new FormControl<string>(''),
    balcony: new FormControl<string>(''),
    propertyFeatures: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  furnitureSelectBoxIndex = 4;

  isFurniturePropertyFeatureMarked(): boolean {
    return (
      this.propertyFeaturesBoxes[this.furnitureSelectBoxIndex].checkmark
        .state === 'checked'
    );
  }
}
