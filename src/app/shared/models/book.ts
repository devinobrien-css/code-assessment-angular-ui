export interface Genre {
  id: number;
  name: string;
}

interface BookTransaction {
  userId: string;
  checkedInById: string;
}

interface Favorite {
  userId: string;
}

export interface BookResponse {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: Genre;
  transactions: BookTransaction[];
  favorites: Favorite[];
  isAvailable: boolean;
  expectedReturnDate: string;
  image: string;
  isbn: string;
  publisher: string;
  year: number;
  pages: number;
}

export interface AddBookRequest {
  title: string;
  author: string;
  description: string;
  genreId: string;
  image: string;
  isbn: string;
  publisher: string;
  year: number;
  pages: number;
  is_best_seller: boolean;
}
