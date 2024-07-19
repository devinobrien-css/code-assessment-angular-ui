import { Component } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { BookResponse, Genre } from '../../../shared/models/book';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GenreService } from '../../../core/services/genre.service';
import { RouterModule } from '@angular/router';
import { ViewBookComponent } from '../view-book/view-book.component';

export enum Sort {
  Title = 'title',
  Author = 'author',
  Genre = 'genre',
  Pages = 'page count',
}

@Component({
  selector: 'app-browse-books',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterModule,
    ViewBookComponent,
  ],
  templateUrl: './browse-books.component.html',
  styleUrl: './browse-books.component.css',
})
export class BrowseBooksComponent {
  genres: Genre[] = [];
  books: BookResponse[] = [];
  sorts = [
    { value: Sort.Title, label: 'Title' },
    { value: Sort.Author, label: 'Author' },
    { value: Sort.Genre, label: 'Genre' },
    { value: Sort.Pages, label: 'Page Count' },
  ];

  display_filter = false;
  selected_sort: string = '';
  selected_genres: number[] = [];
  show_unavailable = new FormControl(false);

  search = new FormControl('');

  selected_book: BookResponse | null = null;

  constructor(
    private bookService: BookService,
    private genreService: GenreService,
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response;
    });

    this.genreService.getGenres().subscribe((response) => {
      this.genres = response;
    });
  }

  selectBook(book: BookResponse) {
    this.selected_book = book;
  }

  deselectBook() {
    this.selected_book = null;
  }

  toggleAvailability() {
    this.show_unavailable.setValue(!this.show_unavailable.value);
  }

  toggleGenre(id: number) {
    if (this.selected_genres.includes(id)) {
      this.selected_genres = this.selected_genres.filter(
        (genre) => genre !== id,
      );
    } else {
      this.selected_genres.push(id);
    }
  }

  genreIsSelected(id: number) {
    return this.selected_genres.includes(id);
  }

  toggleDisplayFilter() {
    this.display_filter = !this.display_filter;
  }

  clearGenres() {
    this.selected_genres = [];
  }

  selectSort(sort: string) {
    this.selected_sort = sort;
  }

  clearSort() {
    this.selected_sort = '';
  }

  getBooks() {
    return this.books
      .filter((book) => {
        return (
          book.transactions.every((transaction) => {
            return transaction.checkedInById;
          }) || this.show_unavailable.value
        );
      })
      .filter((book) => {
        return (
          book.title
            .toLowerCase()
            .includes(this.search.value?.toLowerCase() ?? '') ||
          book.author
            .toLowerCase()
            .includes(this.search.value?.toLowerCase() ?? '')
        );
      })
      .filter((book) => {
        if (this.selected_genres.length === 0) {
          return true;
        }
        return this.selected_genres.includes(book.genre.id);
      })
      .sort((a, b) => {
        if (this.selected_sort === Sort.Title) {
          return a.title.localeCompare(b.title);
        } else if (this.selected_sort === Sort.Author) {
          return a.author.localeCompare(b.author);
        } else if (this.selected_sort === Sort.Genre) {
          return a.genre.name.localeCompare(b.genre.name);
        } else if (this.selected_sort === Sort.Pages) {
          return a.pages - b.pages;
        } else {
          return 0;
        }
      });
  }
}
