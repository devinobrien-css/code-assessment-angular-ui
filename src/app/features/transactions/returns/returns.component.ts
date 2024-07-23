import { Component } from '@angular/core';
import { UserTransactionResponse } from '../../../shared/models/transactions';
import { TransactionService } from '../../../core/services/transaction.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, ToastModule],
  templateUrl: './returns.component.html',
})
export class ReturnsComponent {
  transactions: UserTransactionResponse[] = [];

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
}
