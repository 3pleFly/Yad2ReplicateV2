import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { RealestateCategory } from '../../models/realestate-category.interface';

@Component({
  selector: 'app-select-ad-category',
  templateUrl: './select-ad-category.component.html',
  styleUrls: ['./select-ad-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectAdCategoryComponent {
  constructor(private localService: LocalisationService) {}

  @Output() nextStep = new EventEmitter<RealestateCategory>();

  local = this.localService.publish;
  images = this.localService.images.selectCategory;

  realestateForSale(category: RealestateCategory) {
    this.nextStep.emit(category);
  }
}
