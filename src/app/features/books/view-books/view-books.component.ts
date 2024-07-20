import { Component } from '@angular/core';
import { BookResponse } from '../../../shared/models/book';
import { BookService } from '../../../core/services/book.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-view-books',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf, NgFor, ToastModule],
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.css',
})
export class ViewBooksComponent {
  books: BookResponse[] = [];

  search = new FormControl('');

  confirm_delete_id = 0;

  constructor(
    private bookService: BookService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  onConfirmDelete(id: number) {
    this.confirm_delete_id = id;
    this.messageService.add({
      key: 'confirm-delete',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
    });
  }

  onCanceledDelete() {
    this.confirm_delete_id = 0;
    this.messageService.clear('confirm-delete');
  }

  onDelete() {
    this.bookService.deleteBook(this.confirm_delete_id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book deleted successfully',
      });
      this.books = this.books.filter(
        (book) => book.id !== this.confirm_delete_id,
      );
      this.confirm_delete_id = 0;
      this.messageService.clear('confirm-delete');
    });
  }

  getBooks() {
    return this.books.filter((book) => {
      return (
        book.title.toLowerCase().includes(this.search.value!.toLowerCase()) ||
        book.author.toLowerCase().includes(this.search.value!.toLowerCase()) ||
        book.isbn.toLowerCase().includes(this.search.value!.toLowerCase())
      );
    });
  }
}
