import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
import Author from '../../models/Author';
import Book from '../../models/Book';
import { AuthorTC, BookTC } from '../types';

// Add relationships
AuthorTC.addFields({
  books: {
    type: [BookTC],
    resolve: async (author) => {
      return await Book.find({ authorId: author.id });
    },
  },
});

// Interfaces
interface AuthorQueryArgs {
  id: string;
}

interface AuthorMutationArgs {
  name: string;
}

// Author resolvers
AuthorTC.addResolver({
  kind: 'query',
  name: 'authors',
  type: [AuthorTC],
  resolve: async () => await Author.find({})
});

AuthorTC.addResolver({
  kind: 'query',
  name: 'author',
  type: AuthorTC,
  args: { id: 'ID!' },
  resolve: async ({ args }: ResolverResolveParams<any, any, AuthorQueryArgs>) => 
    await Author.findById(args.id)
});

AuthorTC.addResolver({
  kind: 'mutation',
  name: 'addAuthor',
  type: AuthorTC,
  args: {
    name: 'String!',
  },
  resolve: async ({ args }: ResolverResolveParams<any, any, AuthorMutationArgs>) => {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  },
});

export { AuthorTC };
