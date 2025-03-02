import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
import Book from '../../models/Book';
import Author from '../../models/Author';
import { BookTC, AuthorTC } from '../types';

// Add relationships
BookTC.addFields({
  author: {
    type: AuthorTC,
    resolve: async (book) => {
      return await Author.findById(book.authorId);
    },
  },
});

// Interfaces
interface BookQueryArgs {
  id: string;
}

interface BookMutationArgs {
  name: string;
  genre: string;
  authorId: string;
}

// Book resolvers
BookTC.addResolver({
  kind: 'query',
  name: 'books',
  type: [BookTC],
  resolve: async () => await Book.find({})
});

BookTC.addResolver({
  kind: 'query',
  name: 'book',
  type: BookTC,
  args: { id: 'ID!' },
  resolve: async ({ args }: ResolverResolveParams<any, any, BookQueryArgs>) => 
    await Book.findById(args.id)
});

BookTC.addResolver({
  kind: 'mutation',
  name: 'addBook',
  type: BookTC,
  args: {
    name: 'String!',
    genre: 'String!',
    authorId: 'ID!',
  },
  resolve: async ({ args }: ResolverResolveParams<any, any, BookMutationArgs>) => {
    const newBook = new Book(args);
    return await newBook.save();
  },
});

export { BookTC };
