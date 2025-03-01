export interface Book {
  id: string;
  name: string;
  genre: string;
  author: Author;
}

export interface Author {
  id: string;
  name: string;
  books?: Book[];
}
