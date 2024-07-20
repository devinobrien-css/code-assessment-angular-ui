import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-write-review',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.css',
})
export class WriteReviewComponent {
  bookId = this.route.snapshot.params['bookId'];

  rating = new FormControl(1);
  description = new FormControl('');

  userId = '';

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.userId = user.id;
    });
  }

  setRating(rating: number) {
    this.rating.setValue(rating);
  }

  submit() {
    if (!this.rating.value || !this.description.value) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill out all fields',
      });
      return;
    }

    this.bookService
      .postReview(this.bookId, {
        UserId: this.userId,
        BookId: this.bookId,
        Rating: this.rating.value,
        Description: this.description.value,
      })
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review submitted successfully',
        });
        this.router.navigate(['/browse']);
      });
  }
}
