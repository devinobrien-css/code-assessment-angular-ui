import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { CurrentUserInfoResponse } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(userService: UserService, authService: AuthenticationService) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  getCurrentUserState(): CurrentUserInfoResponse | null {
    return JSON.parse(localStorage.getItem('currentUser') ?? '');
  }

  setCurrentUserState(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
