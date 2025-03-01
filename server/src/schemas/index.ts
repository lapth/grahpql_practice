import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Book {
    id: ID!
    name: String
    genre: String
    authorId: ID!

    author: Author
  }

  type Author {
    id: ID!
    name: String
    books: [Book]
  }

  # The query type, representing the entry point of the API
  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
  }

  type Mutation {
    addAuthor(name: String!): Author
    addBook(name: String!, genre: String!, authorId: ID!): Book
  }
`;

export default typeDefs;
