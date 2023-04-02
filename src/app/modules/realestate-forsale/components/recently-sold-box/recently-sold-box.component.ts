import { Component, inject } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';

@Component({
  selector: 'app-recently-sold-box',
  templateUrl: './recently-sold-box.component.html',
  styleUrls: ['./recently-sold-box.component.css']
})
export class RecentlySoldBoxComponent {
  localService = inject(LocalisationService);

  local = this.localService.recentlySoldBox;
}
