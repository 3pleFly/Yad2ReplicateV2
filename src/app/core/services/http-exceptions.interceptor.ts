import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Yad2ErrorResponse } from '../models/yad2-response.interface';
import { LocalisationService } from './localisation.service';

@Injectable()
export class HttpExceptionsInterceptor implements HttpInterceptor {
  constructor(private localService: LocalisationService) {}
  local = this.localService.errors;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        if (error.error instanceof ErrorEvent) {
          return throwError(
            () => <Yad2ErrorResponse>{ message: this.local.clientSideError }
          );
        } else {
          return throwError(() => this.handleError(error));
        }
      })
    );
  }

  handleError(err: HttpErrorResponse): Yad2ErrorResponse {
    if (!Yad2ErrorResponse.isYad2ErrorResponse(err.error))
      return {
        message: this.local.serverSideError,
        success: false,
        data: null,
      };

    let yad2Error = Yad2ErrorResponse.convertToYad2ErrorResponse(err.error);

    switch (yad2Error.code) {
      case 'BAD_CREDENTIALS':
        yad2Error.message = this.local.badCredentials;
        break;

      case 'DuplicateUserName':
        yad2Error.message = this.local.duplicateUsername;
        break;

      case 'ID_NOT_FOUND':
        yad2Error.message = this.local.idNotFound;
        break;

      case 'RESOURCE_NOT_FOUND':
        yad2Error.message = this.local.resourceNotFound;
        break;

      case 'UNAUTHORIZED':
        yad2Error.message = this.local.unauthorized;
        break;

      case 'TOKEN_EXPIRED':
        yad2Error.message = this.local.tokenExpired;
        break;

      case 'INTERNAL_SERVER_ERROR':
        yad2Error.message = this.local.serverSideError;
        break;
    }
    return yad2Error;
  }
}
