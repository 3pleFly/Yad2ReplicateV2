import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defer, map, Observable, tap } from 'rxjs';
import { GovtAPIData } from 'src/app/modules/publish/models/govt-api.interface';
import { GovtAPi_QueryCity, GovtAPi_QueryStreet } from 'src/assets/api/api';

@Injectable({ providedIn: 'root' })
export class ApiRequestService {
  constructor(private http: HttpClient) {}

  getCities(cityQuery: string): Observable<string[]> {
    return this.http.get<GovtAPIData>(`${GovtAPi_QueryCity}${cityQuery}`).pipe(
      map((v) => v.result.records.map((record) => record.שם_ישוב)),
      map((records) => Array.from(new Set(records)))
    );
  }

  getStreets(cityQuery: string, streetQuery: string): Observable<string[]> {
    return this.http
      .get<GovtAPIData>(`${GovtAPi_QueryStreet}${cityQuery},${streetQuery}`)
      .pipe(
        tap((v) => console.log(cityQuery)),
        map((v) => v.result.records.map((record) => record.שם_רחוב)),
        map((records) => Array.from(new Set(records)))
      );
  }
}
