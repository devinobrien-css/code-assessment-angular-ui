import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CurrentUserInfoResponse,
  ProfileAvatar,
  UserResponse,
} from '../../shared/models/user';
import { BookResponse } from '../../shared/models/book';
import { UserTransactionResponse } from '../../shared/models/transactions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserResponse[]>('/api/User');
  }

  getCurrentUser(): Observable<CurrentUserInfoResponse> {
    return this.http.get<CurrentUserInfoResponse>('/api/account/current-user');
  }

  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`/api/User/${userId}`);
  }

  updateUser(userId: string, first: string, last: string) {
    return this.http.patch(`/api/User/${userId}`, { first, last });
  }

  getProfileAvatars() {
    return this.http.get<ProfileAvatar[]>('/api/User/avatars');
  }

  setProfileAvatar(userId: string, avatarId: string) {
    return this.http.post(`/api/User/${userId}/avatar/${avatarId}`, {});
  }

  getFavorites(userId: string) {
    return this.http.get<BookResponse[]>(`/api/User/${userId}/favorite`);
  }

  userFavoritesBook(userId: string, bookId: number) {
    return this.http.post(`/api/User/${userId}/favorite/${bookId}`, {});
  }

  userUnfavoritesBook(userId: string, bookId: number) {
    return this.http.delete(`/api/User/${userId}/favorite/${bookId}`);
  }

  getTransactions(userId: string) {
    return this.http.get<UserTransactionResponse[]>(
      `/api/User/${userId}/transactions`,
    );
  }
}
