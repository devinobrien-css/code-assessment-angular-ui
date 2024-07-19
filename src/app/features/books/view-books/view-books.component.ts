import { Component } from '@angular/core';
import { BookResponse } from '../../../shared/models/book';
import { BookService } from '../../../core/services/book.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-books',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.css',
})
export class ViewBooksComponent {
  books: BookResponse[] = [];

  search = new FormControl('');

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
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
