import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BookResponse } from '../../../shared/models/book';

@Component({
  selector: 'app-favorited-book-card',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './favorited-book-card.component.html',
})
export class FavoritedBookCardComponent {
  @Input() book: BookResponse | null = null;
  @Input() isFavorite: boolean = false;
  @Input() current_user_id: string = '';

  @Output() removeFavorite: EventEmitter<void> = new EventEmitter();

  constructor() {}

  remove() {
    this.removeFavorite.emit();
  }
}
