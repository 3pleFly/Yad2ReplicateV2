import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Yad2Api, YAD2_APIS } from 'src/app/core/helpers/api.injection-token';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { StepData } from '../../models/step-data.interface';
import { Yad2RealestateFormData } from '../../models/yad2-form-data.interface';
import { FormDataService } from '../../services/form-data.service';
import { autoCompleteSearch } from 'src/app/core/helpers/functions.helpers';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { PublishRealestateService } from '../../services/publish-realestate.service';
import { BaseStep } from '../../directives/base-step.directive';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseStep, useExisting: Step2Component }],
})
export class Step2Component extends BaseStep implements OnInit {
  constructor(
    @Inject(YAD2_APIS) private apis: Yad2Api,
    private localService: LocalisationService,
    private apiRequestService: ApiRequestService,
    private formData: FormDataService<Yad2RealestateFormData>,
    realestateService: PublishRealestateService,
    override stepData: StepData
  ) {
    super(realestateService);
  }

  ngOnInit(): void {}

  local = this.localService.publish;
  propertyTypesOptions = this.localService.allPropertyTypes;
  propertyStatesOptions = this.localService.allPropertyStates;
  streetControlView = false;

  form = new FormGroup({
    propertyType: new FormControl<string>(''),
    propertyState: new FormControl<string>(''),
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    houseNum: new FormControl<string>(''),
    neighborhood: new FormControl<string>({ value: '', disabled: true }),
    area: new FormControl<string>({ value: '', disabled: true }),
    floor: new FormControl<string>(''),
    totalFloors: new FormControl<string>(''),
    isOnColumns: new FormControl<string>(''),
  });

  cityDataList$ = this.setCitiesDataListStream();
  streetDataList$ = this.setStreetsDataListStream();

  getCityApi = this.apis.GovtApiGetCity;
  getStreetApi = this.apis.GovtApiGetStreet;

  isOnColumnsCheckmark: Checkmark = {
    name: this.local.step2_label_checkboxIsOnColumns,
    state: 'unchecked',
  };

  floorControlRequired = true;
  totalFloorControlRequired = true;

  monthlyEmailAdsCheckmark: Checkmark = {
    name: this.local.step2_label_checkboxAllowEmailAds,
    state: 'unchecked',
  };

  setPropertyType(option: string) {
    this.form.controls.propertyType.setValue(option);
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
      autoCompleteSearch(100, 2, (term) =>
        this.apiRequestService.getCities(term)
      )
    );
  }

  setStreetsDataListStream() {
    return this.form.controls.street.valueChanges.pipe(
      autoCompleteSearch(100, 2, (term) =>
        this.apiRequestService.getStreets(this.cityValue, term)
      )
    );
  }

  get cityValue(): string {
    return this.form.controls.city.value ?? '';
  }
}
