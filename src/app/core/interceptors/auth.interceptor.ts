import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthenticationService);

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });

  return next(cloneReq).pipe
    (
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('-0-0-0-0-')

          // Refresh the access token
          return authService.refreshAccessToken().pipe(
            
            switchMap(() => {
              localStorage.clear();
              return next(cloneReq)
            })
          );
        }
        return throwError(() => error);
      })
    );
};
