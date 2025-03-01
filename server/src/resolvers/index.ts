import Author, { AuthorDTO } from "../models/Author";
import Book, { BookDTO } from "../models/Book";

type ResolverContext = {
  // Add any context properties here if needed
}

type QueryResolvers = {
  books: (_parent: unknown, _args: unknown, _context: ResolverContext) => Promise<BookDTO[]>;
  book: (_parent: unknown, args: { id: string }, _context: ResolverContext) => Promise<BookDTO | null>;
  authors: (_parent: unknown, _args: unknown, _context: ResolverContext) => Promise<AuthorDTO[]>;
  author: (_parent: unknown, args: { id: string }, _context: ResolverContext) => Promise<AuthorDTO | null>;
}

type BookResolvers = {
  author: (parent: BookDTO, _args: unknown, _context: ResolverContext) => Promise<AuthorDTO | null>;
}

type AuthorResolvers = {
  books: (parent: AuthorDTO, _args: unknown, _context: ResolverContext) => Promise<BookDTO[]>;
}

type MutationResolvers = {
  addAuthor: (_parent: unknown, args: { name: string }, _context: ResolverContext) => Promise<AuthorDTO>;
  addBook: (_parent: unknown, args: { name: string, genre: string, authorId: string }, _context: ResolverContext) => Promise<BookDTO>;
}

type Resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  Book: BookResolvers,
  Author: AuthorResolvers
}

const resolvers: Resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_parent, args) => await Book.findById(args.id),
    authors: async () => await Author.find(),
    author: async (_parent, args) => await Author.findById(args.id)
  },

  Book: {
    author: async (parent: BookDTO) => {
      return await Author.findById(parent.authorId);
    }
  },

  Author: {
    books: async (parent: AuthorDTO) => {
      return await Book.find({ authorId: parent.id });
    }
  },

  Mutation: {
    addAuthor: async (_parent, args) => {
      const newAuthor = new Author(args);
      return await newAuthor.save();
    },

    addBook: async (_parent, args) => {
      const newBook = new Book(args);
      return await newBook.save();
    }
  }
};

export default resolvers;
