import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { CurrentUserInfoResponse } from '../../shared/models/user';
import { UserTransactionResponse } from '../../shared/models/transactions';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './checked-out-books.component.html',
})
export class CheckedOutBooksComponent {
  user: CurrentUserInfoResponse | null = null;
  transactions: UserTransactionResponse[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;

      this.userService.getTransactions(user.id).subscribe((transactions) => {
        this.transactions = transactions;
      });
    });
  }

  userHasNoTransactions() {
    return this.transactions.length === 0;
  }
}
