import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import {
  EmailExistsResponse,
  TokenResponse,
} from '../../shared/models/authentication';
import { UserService } from './user.service';

// TODO: fix endpoint url

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {}

  //TODO
  getIsAuthenticated(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  login(email: string, password: string): void {
    this.http
      .post<TokenResponse>('https://localhost:7120/login', { email, password })
      .subscribe((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        this.userService.getCurrentUser().subscribe((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
        });

        // TODO - Redirect to explore
        this.router.navigate(['/']);
      });
  }

  register(
    first: string,
    last: string,
    email: string,
    password: string,
    is_librarian: boolean,
  ): void {
    this.http
      .post('https://localhost:7120/api/account/register', {
        first,
        last,
        email,
        password,
        isEmployee: is_librarian,
      })
      .subscribe(() => {
        this.login(email, password);
      });
  }

  // Call the refresh token endpoint to get a new access token
  refreshAccessToken(): Observable<unknown> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<TokenResponse>(`https://localhost:7120/refresh`, { refreshToken })
      .pipe(
        tap((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }),
        catchError((error) => {
          this.router.navigate(['/login']);
          return error;
        }),
      );
  }

  logout(): void {
    // Your logout logic here
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);
  }

  async emailExists(email: string) {
    return this.http.get<EmailExistsResponse>(
      `/api/account/email-exists?email=${email}`,
    );
  }
}
