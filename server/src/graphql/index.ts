import { schemaComposer } from 'graphql-compose';
import { BookTC } from './resolvers/book';
import { AuthorTC } from './resolvers/author';

// Add queries to schema
schemaComposer.Query.addFields({
  books: BookTC.getResolver('books'),
  book: BookTC.getResolver('book'),
  authors: AuthorTC.getResolver('authors'),
  author: AuthorTC.getResolver('author'),
});

// Add mutations to schema
schemaComposer.Mutation.addFields({
  addBook: BookTC.getResolver('addBook'),
  addAuthor: AuthorTC.getResolver('addAuthor'),
});

export default schemaComposer.buildSchema();
