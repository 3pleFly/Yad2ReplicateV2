import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RealestateCategory } from '../../models/realestate-category.interface';
import { PublishRealestateService } from '../../services/publish-realestate.service';

@Component({
  selector: 'app-publish-realestate',
  templateUrl: './publish-realestate.component.html',
  styleUrls: ['./publish-realestate.component.css'],
  providers: [PublishRealestateService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublishRealestateComponent {
  constructor(private realestateService: PublishRealestateService) {}

  sevenSteps = this.realestateService.sevenSteps;
  currentStep = this.realestateService.currentStep;

  setCategory(category: RealestateCategory) {
    switch(category) {
      case 'sale': this.activateForsaleForm()
      break;

      default: return;
    }
  }

  activateForsaleForm() {
    this.currentStep++;
  }
}
