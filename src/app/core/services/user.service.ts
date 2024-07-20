import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CurrentUserInfoResponse,
  ProfileAvatar,
} from '../../shared/models/user';
import { BookResponse } from '../../shared/models/book';
import { UserTransactionResponse } from '../../shared/models/transactions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<CurrentUserInfoResponse>('/api/account/current-user');
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
