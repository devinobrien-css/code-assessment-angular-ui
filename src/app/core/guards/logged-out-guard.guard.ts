import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const loggedOutGuardGuard: CanActivateFn = () => {
  const router = new Router();
  const authService = inject(AuthenticationService);

  if(!authService.getIsAuthenticated()) {
    return true;
  }

  router.navigate(['']);
  return false;
};
