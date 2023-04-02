import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { SessionService } from '../services/session.service';

export const authGuard = () => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  return sessionService.user$.pipe(
    map((user) => (user ? true : router.navigate(['auth'])))
  );
};
