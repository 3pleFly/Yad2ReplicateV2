import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpExceptionsInterceptor } from "../services/http-exceptions.interceptor";
import { TokenInterceptor } from "../services/token.interceptor";

export const ExceptionInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpExceptionsInterceptor,
  multi: true,
};

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
