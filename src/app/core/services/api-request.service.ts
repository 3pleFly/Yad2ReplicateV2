import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { GovtAPIData } from 'src/app/modules/publish/models/govt-api.interface';
import { PropertyAdDto } from 'src/app/modules/publish/models/property-ad-dto.interface';

import {
  GovtAPi_QueryCity,
  GovtAPi_QueryStreet,
  Yad2APIURL,
} from 'src/assets/api/api';
import { Yad2Response } from '../models/yad2-response.interface';
import { Yad2Resource } from '../models/yad2resource.interface';
import { SessionService } from './session.service';
@Injectable({ providedIn: 'root' })
export class ApiRequestService {
  private noInterceptorsHttpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    handler: HttpBackend
  ) {
    this.noInterceptorsHttpClient = new HttpClient(handler);
  }

  getCities(cityQuery: string): Observable<string[]> {
    return this.noInterceptorsHttpClient
      .get<GovtAPIData>(`${GovtAPi_QueryCity}${cityQuery}`)
      .pipe(
        map((v) => v.result.records.map((record) => record.שם_ישוב)),
        map((records) => Array.from(new Set(records)))
      );
  }

  getStreets(cityQuery: string, streetQuery: string): Observable<string[]> {
    return this.noInterceptorsHttpClient
      .get<GovtAPIData>(`${GovtAPi_QueryStreet}${cityQuery},${streetQuery}`)
      .pipe(
        map((v) => v.result.records.map((record) => record.שם_רחוב)),
        map((records) => Array.from(new Set(records)))
      );
  }

  getPropertyFeatures(): Observable<Yad2Resource[]> {
    return this.http
      .get<Yad2Response>(`${Yad2APIURL}/propertyfeatures`)
      .pipe(map((r) => r.data as Yad2Resource[]));
  }

  getPropertyTypes(): Observable<Yad2Resource[]> {
    return this.http
      .get<Yad2Response>(`${Yad2APIURL}/propertytypes`)
      .pipe(map((r) => r.data as Yad2Resource[]));
  }

  getPropertyStates(): Observable<Yad2Resource[]> {
    return this.http
      .get<Yad2Response>(`${Yad2APIURL}/propertystates`)
      .pipe(map((r) => r.data as Yad2Resource[]));
  }

  postNewPropertyAd(propertyAdDto: PropertyAdDto) {
    const user = this.sessionService.user;
    if (!user) throw new Error('User is not logged in');

    const userId = user.id;
    return this.http.post(`${Yad2APIURL}/users/${userId}/properties`, propertyAdDto);
  }
}
