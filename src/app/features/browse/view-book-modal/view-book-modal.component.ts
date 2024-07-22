import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../shared/models/book';
import { UserService } from '../../../core/services/user.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookReviewComponent } from '../book-review/book-review.component';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [NgIf, NgClass, RouterModule, NgFor, BookReviewComponent],
  templateUrl: './view-book-modal.component.html',
})
export class ViewBookComponent {
  bookId = this.route.snapshot.paramMap.get('bookId');

  book: BookResponse | null = null;

  current_user_id: string = '';
  favorited = false;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    if (this.bookId) {
      this.bookService.getBook(Number(this.bookId)).subscribe((response) => {
        this.book = response;
      });
    }

    this.userService.getCurrentUser().subscribe((response) => {
      this.current_user_id = response.id;

      this.favorited = this.isBookFavorite();
    });
  }

  isBookFavorite() {
    if (!this.book) {
      return false;
    }
    return this.book.favorites.some(
      (favorite) => favorite.userId === this.current_user_id,
    );
  }

  toggleFavorite() {
    if (!this.book) {
      return;
    }

    if (this.favorited) {
      this.userService
        .userUnfavoritesBook(this.current_user_id, this.book.id)
        .subscribe();
    } else {
      this.userService
        .userFavoritesBook(this.current_user_id, this.book.id)
        .subscribe();
    }

    this.favorited = !this.favorited;
  }
}
