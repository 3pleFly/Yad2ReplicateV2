import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { RealestateDataService } from '../../services/publish-realestate.service';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { RealestateFormService } from '../../services/realestate-form-data.service';
import { Yad2Resource } from 'src/app/core/models/yad2resource.interface';
import { isANumber } from 'src/app/core/helpers/functions.helpers';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step3Component extends BaseStep implements OnInit {
  constructor(
    private localService: LocalisationService,
    realestateService: RealestateDataService,
    formData: RealestateFormService,
    stepData: StepData
  ) {
    super(realestateService, stepData, formData);
  }

  local = this.localService.publish;
  telAvivSvg = this.localService.images.outsource.telaviv;
  tlvContractCheckmark: Checkmark = this.realestateData.tlvContractCheckmark;

  propertyFeatures$ = this.realestateData.propertyFeaturesOptions$;
  propertyFeaturesImgSrc = this.realestateData.propertyFeatureImgSrcs;

  furnitureDescriptionBoxView = false;

  propertyFeaturesLocalisation = this.localService.propertyFeatures;

  textAreaProgressBarMessage =
    this.realestateData.descriptionTextAreaProgressBarMessages;

  form = new FormGroup({
    rooms: new FormControl<number>(0),
    parkings: new FormControl<number>(0),
    balconies: new FormControl<number>(0),
    propertyFeaturesIds: new FormControl<number[] | null>(null),
    description: new FormControl<string>(''),
  });

  furnitureSelectBoxIndex = 4;

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.setFormData({ ...this.form.getRawValue() });
      this.nextStep();
    }
  }

  onDescriptionInput(text: string) {
    this.form.controls.description.setValue(text);
  }

  onSelectPropertyFeature(propertyFeatureNames: string[]) {
    if (propertyFeatureNames.length <= 0) this.setProperyFeatureIdsControl([]);

    const propertyFeaturesIds =
      this.realestateData.getPropertyFeaturesIdsByNames(propertyFeatureNames);

    this.setProperyFeatureIdsControl(propertyFeaturesIds);
  }

  setProperyFeatureIdsControl(propertyFeatureIds: number[]) {
    this.form.controls.propertyFeaturesIds.setValue(propertyFeatureIds);
  }

  onSelectRooms(rooms: string | null) {
    if (rooms) this.form.controls.rooms.setValue(parseFloat(rooms));
  }

  onSelectParking(parking: string) {
    isANumber(parking)
      ? this.form.controls.parkings.setValue(parseInt(parking))
      : this.form.controls.parkings.setValue(0);
  }
  onSelectBalconies(balcony: string) {
    isANumber(balcony)
      ? this.form.controls.balconies.setValue(parseInt(balcony))
      : this.form.controls.balconies.setValue(0);
  }
}
