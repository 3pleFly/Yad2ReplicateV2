import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { PropertyAdDto } from '../../publish/models/property-ad-dto.interface';

@Injectable()
export class AdService {
  private _apiRequestService = inject(ApiRequestService);

  getPropertyAds(limit = 10, offset = 0): Observable<PropertyAdDto[]> {
    return this._apiRequestService
      .getPropertyDtos(limit, offset)
      .pipe(map((y2r) => <PropertyAdDto[]>y2r.data));
  }

  getCountPropertyAds(): Observable<number> {
    return this._apiRequestService.getCountPropertyAds();
  }
}
