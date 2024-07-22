import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const isEmployeeGuard: CanActivateFn = (
  req,
  next,
): Observable<boolean> => {
  const userService = inject(UserService);

  const router = new Router();

  return userService.getCurrentUser().pipe(
    map((userInfo) => {
      if (userInfo) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    }),
  );
};
