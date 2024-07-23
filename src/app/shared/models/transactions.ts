import { BookResponse } from './book';
import { ProfileAvatar } from './user';

export interface TransactionUserResponse {
  id: string;
  email: string;
  first: string;
  last: string;
  profileAvatar: ProfileAvatar;
}

export interface UserTransactionResponse {
  id: string;
  user: TransactionUserResponse;
  book: BookResponse;
  checkOutTime: string;
  checkInTime: string | null;
  dueTime: string | null;
  checkedOutBy: TransactionUserResponse | null;
  checkedInBy: TransactionUserResponse | null;
  isCheckedIn: boolean;
  isOverdue: boolean;
}

export interface PostTransactionRequest {
  bookId: string;
  userId: string;
}
