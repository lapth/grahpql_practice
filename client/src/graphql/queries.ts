import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      name
      genre
      authorId
      author {
        _id
        name
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      _id
      name
      books {
        _id
        name
        genre
      }
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($record: CreateOneAuthorInput!) {
    addAuthor(record: $record) {
      record {
        _id
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($record: CreateOneBookInput!) {
    addBook(record: $record) {
      record {
        _id
        name
        genre
        authorId
        author {
          _id
          name
        }
      }
    }
  }
`;
