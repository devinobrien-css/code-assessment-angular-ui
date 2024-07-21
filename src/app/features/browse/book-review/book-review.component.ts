import { Component, Input } from '@angular/core';
import { BookReview, Review } from '../../../shared/models/book';

@Component({
  selector: 'app-book-review',
  standalone: true,
  imports: [],
  templateUrl: './book-review.component.html',
})
export class BookReviewComponent {
  @Input() review: BookReview | null = null;
}
