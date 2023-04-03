import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { RealestateFormStep } from '../../models/yad2-form-data.interface';
import { RealestateDataService } from '../../services/publish-realestate.service';
import { RealestateFormService } from '../../services/realestate-form-data.service';
@Component({
  selector: 'app-select-ad-category',
  templateUrl: './select-ad-category.component.html',
  styleUrls: ['./select-ad-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAdCategoryComponent {
  constructor(
    private localService: LocalisationService,
    private formDataService: RealestateFormService,
    private realestateService: RealestateDataService
  ) {}

  local = this.localService.publish;
  images = this.localService.images.selectCategory;

  onRealestate() {
    this.realestateService.nextStep();
  }
}
