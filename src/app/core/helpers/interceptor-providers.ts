import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { GovtAPi_QueryCity, Yad2APIURL } from 'src/assets/api/api';
import { HttpExceptionsInterceptor } from '../services/http-exceptions.interceptor';
import { TokenInterceptor } from '../services/token.interceptor';
import { YAD2_APIS } from './api.injection-token';

export const ExceptionInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpExceptionsInterceptor,
  multi: true,
};

export const TokenInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};

export const Yad2ApisProvider: Provider = {
  provide: YAD2_APIS,
  useValue: { GovtApiGetCity: GovtAPi_QueryCity, Yad2Api: Yad2APIURL },
};
