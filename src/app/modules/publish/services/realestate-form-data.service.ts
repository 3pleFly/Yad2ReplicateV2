import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { SessionService } from 'src/app/core/services/session.service';
import { PropertyAdDto } from '../models/property-ad-dto.interface';
import {
  IRealestateForm,
  RealestateFormStep,
} from '../models/yad2-form-data.interface';

@Injectable()
export class RealestateFormService {
  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  private _formData: IRealestateForm = {
    step1: {
      listingId: null,
      boardId: null,
    },
    step2: {
      propertyTypeId: null,
      propertyStateId: null,
      city: null,
      street: null,
      houseNum: null,
      neighborhood: null,
      areaOfLiving: null,
      floor: null,
      totalFloors: null,
      isOnColumns: null,
    },
    step3: {
      rooms: null,
      balconies: null,
      parkings: null,
      propertyFeaturesIds: null,
      description: null,
    },
    step4: {
      squareMeter: null,
      gardenSquareMeter: null,
      totalSquareMeter: null,
      price: null,
      entryDate: null,
      isImmediateEntryDate: null,
      isFlexibleEntryDate: null,
    },
    step5: {},
    step6: {
      contactName: null,
      phoneNumber: null,
      secondContactName: null,
      secondContactPhoneNumber: null,
      acceptTerms: null,
      useVirtualNumber: null,
      allowCallsOnWeekends: null,
      allowCommercials: null,
    },
    step7: {
      advertisementTypeId: null,
    },
  };

  submitForm() {
    const propertyAdDto = this.createPropertyAdDto();
    const result = this.validatePropertyAdDto(propertyAdDto);
    if (result) {
      const validPropertyAdDto = <PropertyAdDto>propertyAdDto;
      this.apiRequestService.postNewPropertyAd(validPropertyAdDto).subscribe({
        next: () => {},
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.navigateToMain();
        },
      });
    }
  }

  createPropertyAdDto() {
    const { step1, step2, step3, step4, step5, step6, step7 } = this._formData;
    return {
      ...step1,
      ...step2,
      ...step3,
      ...step4,
      ...step5,
      ...step6,
      ...step7,
    } as Partial<PropertyAdDto>;
  }

  validatePropertyAdDto(propertyAdDto: Partial<PropertyAdDto>): boolean {
    for (const [key, value] of Object.entries(propertyAdDto)) {
      if (value == undefined || value == null) {
        console.error('Form validation fail: missing some properties: ' + key);
        return false;
      }
    }
    return true;
  }

  getFormData(index: number): IRealestateForm[keyof IRealestateForm] {
    return Object.values(this._formData)[index];
  }

  setFormData(formStep: keyof IRealestateForm, formData: RealestateFormStep) {
    this.validateStepKeys(formStep, formData);
    this._formData[formStep] = { ...this._formData[formStep], ...formData };
  }

  validateStepKeys(
    formStep: keyof IRealestateForm,
    formData: RealestateFormStep
  ) {
    for (const key in formData) {
      if (!(key in this._formData[formStep])) {
        throw new Error(
          'form data property does not exist in form step: ' + key
        );
      }
    }
  }

  navigateToMain() {
    this.router.navigate(['main']);
  }
}
