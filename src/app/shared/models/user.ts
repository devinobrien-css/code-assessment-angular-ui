import { BookTransaction } from './book';
import { UserTransactionResponse } from './transactions';

export interface CurrentUserInfoResponse {
  id: string;
  email: string;
  roles: string[];
  first: string;
  last: string;
  profileAvatar: ProfileAvatar;
}

export interface UserResponse {
  id: string;
  email: string;
  first: string;
  last: string;
  profileAvatar: string;
  transactions: UserTransactionResponse[];
  roles: string[];
}

export interface ProfileAvatar {
  id: string;
  url: string;
}
