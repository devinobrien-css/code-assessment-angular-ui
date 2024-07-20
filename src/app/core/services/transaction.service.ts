import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PostTransactionRequest,
  UserTransactionResponse,
} from '../../shared/models/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  postTransaction(transaction: PostTransactionRequest) {
    return this.http.post<PostTransactionRequest>(
      '/api/transaction',
      transaction,
    );
  }

  getTransactions() {
    return this.http.get<UserTransactionResponse[]>(`/api/transaction`);
  }

  getTransaction(transactionId: string) {
    return this.http.get<UserTransactionResponse>(
      `/api/transaction/${transactionId}`,
    );
  }

  processTransactionReturn(transactionId: string, checkedInById: string) {
    return this.http.patch(`/api/transaction/${transactionId}`, {
      checkedInById,
    });
  }
}
