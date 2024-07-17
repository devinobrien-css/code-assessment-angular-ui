import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const loggedInGuardGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);

  const router = new Router();

  if(authService.getIsAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
