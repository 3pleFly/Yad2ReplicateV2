import { InjectionToken } from '@angular/core';
import { IRealestateForm } from 'src/app/modules/publish/models/yad2-form-data.interface';
import {
  GovtAPi_QueryCity as getCityUrl,
  GovtAPi_QueryStreet as getStreetUrl,
  Yad2APIURL,
} from 'src/assets/api/api';

export interface Yad2Api {
  GovtApiGetCity: typeof getCityUrl;
  GovtApiGetStreet: typeof getStreetUrl;
  Yad2Api: typeof Yad2APIURL;
}

export type ApiResource = Yad2Api[keyof Yad2Api];

export const YAD2_APIS = new InjectionToken<Yad2Api>(
  'A list of APIs used by this app'
);
