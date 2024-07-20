import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { UserTransactionResponse } from '../../../shared/models/transactions';
import { CurrentUserInfoResponse } from '../../../shared/models/user';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-process-return',
  standalone: true,
  imports: [],
  templateUrl: './process-return.component.html',
  styleUrl: './process-return.component.css',
})
export class ProcessReturnComponent {
  transactionId = this.route.snapshot.params['transactionId'];

  current_user: CurrentUserInfoResponse | null = null;
  transaction: UserTransactionResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.transactionService
      .getTransaction(this.transactionId)
      .subscribe((transaction) => {
        this.transaction = transaction;
      });

    this.userService.getCurrentUser().subscribe((res) => {
      this.current_user = res;
    });
  }

  processReturn() {
    if (this.transaction && this.current_user) {
      this.transactionService
        .processTransactionReturn(this.transaction.id, this.current_user.id)
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book returned successfully',
          });
          this.router.navigate(['/returns']);
        });
    }
  }
}
