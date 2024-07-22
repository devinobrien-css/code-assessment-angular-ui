import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BookResponse } from '../../../shared/models/book';
import { BookService } from '../../../core/services/book.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  bookId = this.route.snapshot.params['bookId'];
  userId = this.route.snapshot.params['userId'];

  book: BookResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private transactionService: TransactionService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.bookService.getBook(this.bookId).subscribe((book) => {
      this.book = book;
    });
  }

  checkout() {
    this.transactionService
      .postTransaction({ bookId: this.bookId, userId: this.userId })
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book checked out successfully',
        });
        this.router.navigate(['/checked-out-books']);
      });
  }
}
