export interface Author {
  _id: string;
  name: string;
  books?: Book[];
}

export interface Book {
  _id: string;
  name: string;
  genre: string;
  author: Author;
}
