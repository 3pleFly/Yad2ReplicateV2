import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RealestateDataService } from '../../services/publish-realestate.service';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { RealestateFormService } from '../../services/realestate-form-data.service';
import { ValidationMessages } from 'src/app/shared/models/validation-messages.interface';
import { convertNumberCommaFormatToNumber } from 'src/app/core/helpers/functions.helpers';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step4Component extends BaseStep {
  constructor(
    realestateService: RealestateDataService,
    stepData: StepData,
    formData: RealestateFormService,
    private localService: LocalisationService
  ) {
    super(realestateService, stepData, formData);
    this.stepData = stepData;
  }

  local = this.localService.publish;

  immediateEntryCheckmark: Checkmark =
    this.realestateData.immediateEntryCheckmark;
  flexibleEntryCheckmark: Checkmark =
    this.realestateData.flexibleEntryCheckmark;

  form = new FormGroup({
    squareMeter: new FormControl<number | null>(null),
    gardenSquareMeter: new FormControl<number | null>(null),
    totalSquareMeter: new FormControl<number | null>(null, [
      Validators.required,
    ]),
    price: new FormControl<number | null>(null),
    pricePerMeter: new FormControl<number | null>({
      value: null,
      disabled: true,
    }),
    entryDate: new FormControl('', [Validators.required]),
    isImmediateEntryDate: new FormControl(false),
    isFlexibleEntryDate: new FormControl(false),
  });

  requiredValidationMessage: ValidationMessages = {
    required: this.local.validation_required_message,
  };

  submit() {
    this.markAllAsDirtyAndTouched();
    if (this.form.valid) {
      const formData = {
        ...this.form.getRawValue(),
        price: convertNumberCommaFormatToNumber(
          this.form.controls.price.value + ''
        ),
        pricePerMeter: this.form.controls.pricePerMeter,
        squareMeter: this.form.controls.squareMeter.value ?? 0,
        gardenSquareMeter: this.form.controls.gardenSquareMeter.value ?? 0,
      } as Partial<any>;

      delete formData['pricePerMeter'];
      this.setFormData(formData);
    }
    this.nextStep();
  }

  onTotalSquareMeterOrPriceInput(inputValue: InputEvent) {
    const totalSquareMeterValue = convertNumberCommaFormatToNumber(
      this.form.controls.totalSquareMeter.value + ''
    );

    const priceValue = convertNumberCommaFormatToNumber(
      this.form.controls.price.value + ''
    );

    if (totalSquareMeterValue && priceValue) {
      const pricePerMeter = priceValue / totalSquareMeterValue;
      this.form.controls.pricePerMeter.setValue(pricePerMeter);
    }
  }

  markAllAsDirtyAndTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsDirty();
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }

  onMarkIsImmediateEntryDate(mark: boolean) {
    this.setEntryDateAndStatus(mark);
    this.clearIsFlexibleEntryDateInput();
  }

  onMarkIsFlexibleEntryDate(mark: boolean) {
    this.setEntryDateAndStatus(mark);
    this.clearIsImmediateEntryDate();
  }

  setEntryDateAndStatus(status: boolean) {
    if (status == true) {
      const now = this.formatDate(new Date());
      this.form.controls.entryDate.setValue(now);
      this.disableEntryDateInput();
    } else {
      this.enableEntryDateInput();
    }
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  enableEntryDateInput() {
    this.form.controls.entryDate.enable();
  }

  disableEntryDateInput() {
    this.form.controls.entryDate.disable();
  }

  clearIsImmediateEntryDate() {
    this.form.controls.isImmediateEntryDate.setValue(false);
  }

  clearIsFlexibleEntryDateInput() {
    this.form.controls.isFlexibleEntryDate.setValue(false);
  }
}
