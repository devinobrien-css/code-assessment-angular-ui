import { Component } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { BookResponse } from '../../../shared/models/book';
import { NgFor } from '@angular/common';
import { AdvertisementLoungeComponent } from '../advertisement-lounge/advertisement-lounge.component';
import { AdvertisementOfficeComponent } from '../advertisement-office/advertisement-office.component';
import { AdvertisementOnlineComponent } from '../advertisement-online/advertisement-online.component';
import { AdvertisementBookDayComponent } from '../advertisement-book-day/advertisement-book-day.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgFor,
    AdvertisementLoungeComponent,
    AdvertisementOfficeComponent,
    AdvertisementOnlineComponent,
    AdvertisementBookDayComponent,
  ],
  templateUrl: './home-page.component.html',
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

  getHighlyRatedBooks() {
    return this.books?.filter((book) => book.averageRating > 4).reverse();
  }

  getBestSellingBooks() {
    return this.books?.filter((book) => book.isBestSeller);
  }
}
