import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { GovtAPIData } from 'src/app/modules/publish/models/govt-api.interface';
import { PropertyAdDto } from 'src/app/modules/publish/models/property-ad-dto.interface';

import {
  GovtAPi_QueryCity,
  GovtAPi_QueryStreet,
  Yad2APIURL,
} from 'src/assets/api/api';
import { User } from '../models/user.interface';
import { Yad2Response } from '../models/yad2-response.interface';
import { Yad2Resource } from '../models/yad2resource.interface';

@Injectable({ providedIn: 'root' })
export class ApiRequestService {
  private _http = inject(HttpClient);
  private _handler = inject(HttpBackend);
  private _noInterceptorsHttpClient = new HttpClient(this._handler);

  getPropertyAdDtos(limit = 10, offset = 0): Observable<PropertyAdDto[]> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);

    return this._http
      .get<Yad2Response>(`${Yad2APIURL}/properties`, {
        params: params,
      })
      .pipe(map((y2r) => <PropertyAdDto[]>y2r.data));
  }

  getCities(cityQuery: string): Observable<string[]> {
    return this._noInterceptorsHttpClient
      .get<GovtAPIData>(`${GovtAPi_QueryCity}${cityQuery}`)
      .pipe(
        map((v) => v.result.records.map((record) => record.שם_ישוב)),
        map((records) => Array.from(new Set(records)))
      );
  }

  getStreets(cityQuery: string, streetQuery: string): Observable<string[]> {
    return this._noInterceptorsHttpClient
      .get<GovtAPIData>(`${GovtAPi_QueryStreet}${cityQuery},${streetQuery}`)
      .pipe(
        map((v) => v.result.records.map((record) => record.שם_רחוב)),
        map((records) => Array.from(new Set(records)))
      );
  }

  getPropertyFeatures(): Observable<Yad2Resource[]> {
    return this._http
      .get<Yad2Response>(`${Yad2APIURL}/propertyfeatures`)
      .pipe(map((r) => r.data as Yad2Resource[]));
  }

  getPropertyTypes(): Observable<Yad2Resource[]> {
    return this._http
      .get<Yad2Response>(`${Yad2APIURL}/propertytypes`)
      .pipe(map((r) => r.data as Yad2Resource[]));
  }

  getPropertyStates(): Observable<Yad2Resource[]> {
    return this._http
      .get<Yad2Response>(`${Yad2APIURL}/propertystates`)
      .pipe(map((r) => r.data as Yad2Resource[]));
  }

  postNewPropertyAd(propertyAdDto: PropertyAdDto, user: User) {
    return this._http.post(
      `${Yad2APIURL}/users/${user.id}/properties`,
      propertyAdDto
    );
  }

  getCountPropertyAds(): Observable<number> {
    return this._http
      .get<Yad2Response>(`${Yad2APIURL}/properties/count`)
      .pipe(map((y2r) => <number>y2r.data));
  }
}
