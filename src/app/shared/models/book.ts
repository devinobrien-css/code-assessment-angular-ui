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

export interface BookReview {
  id: number;
  reviewer: {
    id: string;
    first: string;
    last: string;
    email: string;
    profileAvatar: string;
  };
  rating: number;
  description: string;
  dateReviewed: string;
}

export interface BookResponse {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: Genre;
  transactions: BookTransaction[];
  favorites: Favorite[];
  reviews: BookReview[];
  averageRating: number;
  isAvailable: boolean;
  expectedReturnDate: string;
  image: string;
  isbn: string;
  publisher: string;
  year: number;
  pages: number;
  isBestSeller: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
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
  isBestSeller: boolean;
}

export interface UpdateBookRequest {
  id: number;
  title: string;
  author: string;
  description: string;
  genreId: string;
  image: string;
  isbn: string;
  publisher: string;
  year: number;
  pages: number;
  isBestSeller: boolean;
  isFeatured: boolean;
}

export interface Review {
  BookId: number;
  UserId: string;
  Rating: number;
  Description: string;
}
