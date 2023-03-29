import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { BaseStep } from '../../directives/base-step.directive';
import { StepData } from '../../models/step-data.interface';
import { RealestateDataService } from '../../services/publish-realestate.service';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { RealestateFormService } from '../../services/realestate-form-data.service';
import { ValidationMessages } from 'src/app/shared/models/validation-messages.interface';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step6Component extends BaseStep {
  constructor(
    realestateService: RealestateDataService,
    stepData: StepData,
    formData: RealestateFormService,
    private localService: LocalisationService
  ) {
    super(realestateService, stepData, formData);
  }

  local = this.localService.publish;

  form = new FormGroup({
    contactName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    secondContactName: new FormControl(''),
    secondContactPhoneNumber: new FormControl(''),
    acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    useVirtualNumber: new FormControl(false),
    allowCallsOnWeekends: new FormControl(false),
    allowCommercials: new FormControl(false),
  });

  useVirtualNumberCheckmark: Checkmark =
    this.realestateData.useVirtualNumberCheckmark;
  allowWeekendCallsCheckmark: Checkmark =
    this.realestateData.allowWeekendCallsCheckmark;
  acceptTermsCheckmark: Checkmark = this.realestateData.acceptTermsCheckmark;
  emailAdsCheckmark: Checkmark = this.realestateData.emailAdsCheckmark;

  faCircleQuestion = faCircleQuestion;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;

  requiredValidationMessage: ValidationMessages = {
    required: this.local.validation_required_message,
  };

  requiredTermsAndPrivacyMessage: ValidationMessages = {
    required: this.local.validation_required_terms_message,
  };

  secondaryContactActive = false;

  submit() {
    this.markAllAsDirtyAndTouched();
    if (this.form.valid) {
      this.setFormData({ ...this.form.getRawValue() });
      this.nextStep();
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

  onMarkUseVirtualNumber(marked: boolean) {
    if (marked) {
      this.form.controls.allowCallsOnWeekends.enable();
    } else {
      this.form.controls.allowCallsOnWeekends.disable();
    }
    this.form.updateValueAndValidity();
  }

  toggleSecondaryContact() {
    this.secondaryContactActive = !this.secondaryContactActive;
  }
}

// acceptTerms: true;
// advertisementTypeId: 3;
// allowCallsOnWeekends: null;
// allowCommercials: false;
// areaOfLiving: null;
// balconies: null;
// boardId: 1;
// city: 'תל אביב - יפו ';
// contactName: 'פרדס';
// description: '';
// entryDate: null;
// floor: '4';
// gardenSquareMeter: null;
// houseNum: '1';
// isFlexibleEntryDate: false;
// isImmediateEntryDate: true;
// isOnColumns: false;
// listingId: 1;
// neighborhood: null;
// parkings: null;
// phoneNumber: '0549464954';
// price: null;
// propertyFeatureIds: null;
// propertyStateId: 3;
// propertyTypeId: 1;
// rooms: 0;
// secondContactName: '';
// secondContactPhoneNumber: '';
// squareMeter: null;
// street: 'בלפור';
// totalFloors: '12';
// totalSquareMeter: '123,123';
// useVirtualNumber: false;
