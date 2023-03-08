import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { Response } from 'src/app/shared/dtos/response.interface';
import { Yad2API } from 'src/assets/api/api';
import { AuthenticationDto } from '../models/authenticationDto.interface';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  login(credentials: AuthenticationDto) {
    return this.http
      .post<Response>(`${Yad2API}/auth/signin`, {
        credentials,
      })
      .pipe(tap((r) => this.sessionService.setSession(r.data)));
  }

  register(credentials: AuthenticationDto): Observable<Response> {
    return this.http.post<Response>(`${Yad2API}/auth/signup`, { credentials });
  }
}
