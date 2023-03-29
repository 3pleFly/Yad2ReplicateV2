import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Yad2Api, YAD2_APIS } from 'src/app/core/helpers/api.injection-token';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { StepData } from '../../models/step-data.interface';
import { autoCompleteSearch } from 'src/app/core/helpers/functions.helpers';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { RealestateDataService as RealestateDataService } from '../../services/publish-realestate.service';
import { BaseStep } from '../../directives/base-step.directive';
import { RealestateFormService as RealestateFormService } from '../../services/realestate-form-data.service';
import { Yad2Resource } from 'src/app/core/models/yad2resource.interface';
import { ValidationMessages } from 'src/app/shared/models/validation-messages.interface';
import { skipWhile } from 'rxjs';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step2Component extends BaseStep implements OnInit {
  constructor(
    @Inject(YAD2_APIS) private apis: Yad2Api,
    private localService: LocalisationService,
    private apiRequestService: ApiRequestService,
    realestateData: RealestateFormService,
    realestateService: RealestateDataService,
    stepData: StepData
  ) {
    super(realestateService, stepData, realestateData);
  }

  ngOnInit(): void {}

  local = this.localService.publish;
  streetControlView = false;

  form = new FormGroup({
    propertyTypeId: new FormControl<number | null>(null, [Validators.required]),
    propertyStateId: new FormControl<number | null>(null, [
      Validators.required,
    ]),
    city: new FormControl<string>('', [Validators.required]),
    street: new FormControl<string>('', [Validators.required]),
    houseNum: new FormControl<number | null>(null, [Validators.required]),
    neighborhood: new FormControl<string>({ value: '', disabled: true }),
    areaOfLiving: new FormControl<string>({ value: '', disabled: true }),
    floor: new FormControl<number | null>(null, [Validators.required]),
    totalFloors: new FormControl<number | null>(null, [Validators.required]),
    isOnColumns: new FormControl<boolean>(false),
  });

  cityDataList$ = this.setCitiesDataListStream();
  streetDataList$ = this.setStreetsDataListStream();

  propertyTypesOptions$ = this.realestateData.propertyTypesOptions$;
  propertyStatesOptions$ = this.realestateData.propertyStatesOptions$;

  propertyTypesLocalisation = this.localService.propertyTypes;
  propertyStatesLocalisation = this.localService.propertyStates;

  getStreetApi = this.apis.GovtApiGetStreet;

  isOnColumnsCheckmark: Checkmark = {
    name: this.local.step2_label_checkboxIsOnColumns,
    state: 'unchecked',
  };

  requiredValidationMessage: ValidationMessages = {
    required: this.local.validation_required_message,
  };

  private _isUpdating = false;

  showFloorsSection = true;

  floorControlRequired = true;
  totalFloorControlRequired = true;

  monthlyEmailAdsCheckmark: Checkmark = {
    name: this.local.step2_label_checkboxAllowEmailAds,
    state: 'unchecked',
  };

  submit() {
    this.triggerForm();
    if (this.form.valid) {
      this.setFormData({ ...this.form.getRawValue() });
      this.nextStep();
    }
  }

  triggerForm() {
    this._isUpdating = true;
    this.markAllAsDirtyAndTouched();
    this._isUpdating = false;
  }

  markAllAsDirtyAndTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsDirty();
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }

  onSelectPropertyType(propertyTypeName: string | null) {
    if (propertyTypeName) {
      const propertyType =
        this.realestateData.getPropertyTypeByName(propertyTypeName);
      this.form.controls.propertyTypeId.setValue(propertyType.id);
      this.setFloorSectionView(propertyType);
      return;
    }
    this.form.controls.propertyTypeId.setValue(null);
  }

  onSelectPropertyState(propertyStateName: string | null) {
    if (propertyStateName) {
      const propertyState =
        this.realestateData.getPropertyStateByName(propertyStateName);
      this.form.controls.propertyStateId.setValue(propertyState.id);
      return;
    }
    this.form.controls.propertyStateId.setValue(null);
  }

  setFloorSectionView(propertyType: Yad2Resource) {
    const key = propertyType.name;

    switch (key) {
      case 'Apartment':
      case 'GardenApartment':
      case 'Duplex':
      case 'VacationHouse':
      case 'Basement':
      case 'Triplex':
      case 'Unit':
      case 'Studio':
      case 'Unit':
      case 'RoofOrPenthouse':
      case 'AssistedLiving':
      case 'General':
        this.showFloorsSection = true;
        this.setFloorControlsRequired(true);
        break;
      case 'PrivateHouseOrCottege':
      case 'Lots':
      case 'Townhouse':
      case 'AgriculturalFarm':
      case 'Farm':
      case 'Building':
      case 'Storage':
      case 'Parking':
      case 'PurchasingGroup':
        this.showFloorsSection = false;
        this.setFloorControlsRequired(false);
        break;
    }
  }

  setFloorControlsRequired(value: boolean) {
    if (value) {
      this.form.controls.floor.setValidators([Validators.required]);
      this.form.controls.totalFloors.setValidators([Validators.required]);
      return;
    }
    this.form.controls.floor.clearValidators();
    this.form.controls.totalFloors.clearValidators();
  }

  onSelectCity(city: string) {
    if (!city) {
      this.streetControlView = false;
      return;
    }
    this.cityDataList$ = this.setCitiesDataListStream();
    this.streetControlView = true;
  }

  onSelectStreet(street: string) {
    this.streetDataList$ = this.setStreetsDataListStream();
  }

  setCitiesDataListStream() {
    return this.form.controls.city.valueChanges.pipe(
      skipWhile(() => this._isUpdating),
      autoCompleteSearch(100, 2, (term) =>
        this.apiRequestService.getCities(term)
      )
    );
  }

  setStreetsDataListStream() {
    return this.form.controls.street.valueChanges.pipe(
      skipWhile(() => this._isUpdating),
      autoCompleteSearch(100, 2, (term) =>
        this.apiRequestService.getStreets(this.cityValue, term)
      )
    );
  }

  get cityValue(): string {
    return this.form.controls.city.value ?? '';
  }
}
