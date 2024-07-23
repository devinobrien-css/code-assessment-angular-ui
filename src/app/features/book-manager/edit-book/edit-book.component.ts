import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genre } from '../../../shared/models/book';
import { BookService } from '../../../core/services/book.service';
import { GenreService } from '../../../core/services/genre.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent {
  genres: Genre[] = [];
  bookId = this.route.snapshot.params['id'];

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  author = new FormControl('');
  isbn = new FormControl('');
  pages = new FormControl(0);
  selected_genre = new FormControl();
  year = new FormControl(2024);
  publisher = new FormControl('');
  image = new FormControl('');
  description = new FormControl('');
  is_best_seller = new FormControl(false);
  is_featured = new FormControl(false);

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.genreService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.bookService.getBook(this.bookId).subscribe((book) => {
      this.title.setValue(book.title);
      this.author.setValue(book.author);
      this.isbn.setValue(book.isbn);
      this.pages.setValue(book.pages);
      this.selected_genre.setValue(book.genre);
      this.year.setValue(book.year);
      this.publisher.setValue(book.publisher);
      this.image.setValue(book.image);
      this.description.setValue(book.description);
      this.is_best_seller.setValue(book.isBestSeller);
      this.is_featured.setValue(book.isFeatured);
    });
  }

  toggleBestSeller() {
    this.is_best_seller.setValue(!this.is_best_seller.value);
  }

  toggleFeatured() {
    this.is_featured.setValue(!this.is_featured.value);
  }

  updateBook() {
    if (
      this.title.invalid ||
      this.author.invalid ||
      this.isbn.invalid ||
      this.pages.invalid ||
      this.selected_genre.invalid ||
      this.year.invalid ||
      this.publisher.invalid ||
      this.image.invalid ||
      this.description.invalid ||
      this.is_best_seller.invalid ||
      this.is_featured.invalid
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all fields',
      });
      return;
    }

    this.bookService
      .updateBook(this.bookId, {
        id: this.bookId,
        title: this.title.value ?? '',
        author: this.author.value ?? '',
        isbn: this.isbn.value ?? '',
        pages: this.pages.value ?? 0,
        genreId: this.selected_genre.value.id ?? 1,
        year: this.year.value ?? 2024,
        publisher: this.publisher.value ?? '',
        image: this.image.value ?? '',
        description: this.description.value ?? '',
        isBestSeller: this.is_best_seller.value!,
        isFeatured: this.is_featured.value!,
      })
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book updated successfully',
        });
      });
  }
}
