import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../shared/models/book';
import { UserService } from '../../../core/services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [NgClass],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css',
})
export class ViewBookComponent {
  @Input() book: BookResponse | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter();

  current_user_id: string = '';
  favorited = false;

  constructor(private userService: UserService) {}

  closeBook() {
    this.close.emit();
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

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((response) => {
      this.current_user_id = response.id;

      this.favorited = this.isBookFavorite();
    });
  }
}
