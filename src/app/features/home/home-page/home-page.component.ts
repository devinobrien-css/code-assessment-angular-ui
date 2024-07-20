import { Component } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { BookResponse } from '../../../shared/models/book';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  books: BookResponse[] | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response;
    });
  }

  getFeaturedBooks() {
    return this.books?.filter((book) => book.isFeatured);
  }

  getNewBooks() {
    return this.books?.filter((book) => book.isNewArrival);
  }

  getBestSellingBooks() {
    return this.books?.filter((book) => book.isBestSeller);
  }
}
