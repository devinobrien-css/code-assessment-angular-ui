import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genre } from '../../../shared/models/book';
import { BookService } from '../../../core/services/book.service';
import { GenreService } from '../../../core/services/genre.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent {
  genres: Genre[] = [];

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  author = new FormControl('');
  isbn = new FormControl('');
  pages = new FormControl(0);
  genre = new FormControl();
  year = new FormControl(2024);
  publisher = new FormControl('');
  image = new FormControl('');
  description = new FormControl('');
  is_best_seller = new FormControl(false);

  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.genreService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  updateBook() {
    if (
      this.title.invalid ||
      this.author.invalid ||
      this.isbn.invalid ||
      this.pages.invalid ||
      this.genre.invalid ||
      this.year.invalid ||
      this.publisher.invalid ||
      this.image.invalid ||
      this.description.invalid
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all fields',
      });
      return;
    }

    this.bookService
      .addBook({
        title: this.title.value ?? '',
        author: this.author.value ?? '',
        isbn: this.isbn.value ?? '',
        pages: this.pages.value ?? 0,
        genreId: this.genre.value ?? 1,
        year: this.year.value ?? 2024,
        publisher: this.publisher.value ?? '',
        image: this.image.value ?? '',
        description: this.description.value ?? '',
        is_best_seller: this.is_best_seller.value ?? false,
      })
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book added successfully',
        });
      });
  }
}
