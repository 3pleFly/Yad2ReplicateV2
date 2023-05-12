import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { delay, map, tap } from 'rxjs';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { SessionService } from 'src/app/core/services/session.service';
import { RealestateDataService } from '../../services/realestate-data.service';

@Component({
  selector: 'app-realestate-forsale',
  templateUrl: './realestate-forsale.component.html',
  styleUrls: ['./realestate-forsale.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealestateForsaleComponent implements OnInit {
  private _apiRequestService = inject(ApiRequestService);
  private _realestateDataService = inject(RealestateDataService);

  propertyAdDtos$ = this._apiRequestService
    .getPropertyAdDtos()
    .pipe(delay(1000));

  maxAdPages$ = this._apiRequestService.getCountPropertyAds().pipe(
    map((count) => Math.floor(count / 10) + 1),
    tap((v) => console.log(v))
  );

  ngOnInit(): void {}

  onPageChange(page: number) {
    const offset = (page - 1) * 10;
    this.propertyAdDtos$ = this._apiRequestService.getPropertyAdDtos(
      10,
      offset
    );
  }
}
