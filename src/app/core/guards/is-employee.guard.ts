import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const isEmployeeGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);

  const router = new Router();

  userService.getCurrentUser().subscribe((user) => {
    if (user.roles.includes('Employee')) {
      return true;
    }
    router.navigate(['/unauthorized']);
    return false;
  });

  return false;
};
