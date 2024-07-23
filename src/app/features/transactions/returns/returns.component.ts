import { Component } from '@angular/core';
import { UserTransactionResponse } from '../../../shared/models/transactions';
import { TransactionService } from '../../../core/services/transaction.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './returns.component.html',
})
export class ReturnsComponent {
  transactions: UserTransactionResponse[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((transactions) => {
      console.log('transactions');
      console.log(transactions);
      this.transactions = transactions;
    });
  }
}
