import { Component } from '@angular/core';
import { UserTransactionResponse } from '../../../shared/models/transactions';
import { TransactionService } from '../../../core/services/transaction.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, ToastModule, ReactiveFormsModule],
  templateUrl: './returns.component.html',
})
export class ReturnsComponent {
  transactions: UserTransactionResponse[] = [];

  search = new FormControl('');

  jumpToUserId = '';

  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  onConfirmLeave(id: string) {
    this.jumpToUserId = id;
    this.messageService.add({
      key: 'confirm-leave',
      sticky: true,
      severity: 'warn',
      summary: "You're about to leave this page",
      detail: 'Confirm to proceed',
    });
  }

  onCanceledLeave() {
    this.jumpToUserId = '';
    this.messageService.clear('confirm-leave');
  }

  onLeave() {
    this.router.navigate([`user-manager/${this.jumpToUserId}`]);
  }

  getFilteredTransactions() {
    return this.transactions.filter(
      (transaction) =>
        transaction.user.email.includes(this.search.value ?? '') ||
        transaction.book.title.includes(this.search.value ?? '') ||
        transaction.user.first.includes(this.search.value ?? '') ||
        transaction.user.last.includes(this.search.value ?? ''),
    );
  }
}
