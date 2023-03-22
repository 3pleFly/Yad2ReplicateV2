import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Yad2Board } from '../../models/board.type';

@Component({
  selector: 'app-select-ad-category',
  templateUrl: './select-ad-category.component.html',
  styleUrls: ['./select-ad-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectAdCategoryComponent {
  constructor(private localService: LocalisationService) {}

  @Output() nextStep = new EventEmitter<Yad2Board>();

  local = this.localService.publish;
  images = this.localService.images.selectCategory;

  realestateForSale(board: Yad2Board) {
    this.nextStep.emit(board);
  }
}
