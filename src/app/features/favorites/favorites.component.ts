import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { BookResponse } from '../../shared/models/book';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  favorites: BookResponse[] = [];
  current_user_id: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((response) => {
      this.current_user_id = response.id;
      this.userService.getFavorites(response.id).subscribe((favorites) => {
        this.favorites = favorites;
      });
    });
  }

  isBookFavorite(book: BookResponse) {
    return this.favorites.some((favorite) => favorite.id === book.id);
  }

  removeFavorite(book: BookResponse) {
    this.userService
      .userUnfavoritesBook(this.current_user_id, book.id)
      .subscribe(() => {
        this.favorites = this.favorites.filter(
          (favorite) => favorite.id !== book.id,
        );
      });
  }
}
