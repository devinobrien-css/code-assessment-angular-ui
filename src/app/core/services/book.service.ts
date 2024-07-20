import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddBookRequest,
  BookResponse,
  Review,
  UpdateBookRequest,
} from '../../shared/models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<BookResponse[]>('/api/book');
  }

  getBook(id: number) {
    return this.http.get<BookResponse>(`/api/book/${id}`);
  }

  addBook(book: AddBookRequest) {
    return this.http.post('/api/book', book);
  }

  updateBook(id: number, book: UpdateBookRequest) {
    return this.http.patch(`/api/book/${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`/api/book/${id}`);
  }

  postReview(bookId: number, review: Review) {
    return this.http.post(`/api/book/${bookId}/review`, review);
  }
}
