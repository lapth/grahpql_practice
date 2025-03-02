import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { Types } from 'mongoose';
import { BookModel } from '../models/Book';
import { AuthorModel } from '../models/Author';

// Create GraphQL types from Mongoose models
const customizationOptions = {
  removeFields: ['__v'],
  inputType: {
    removeFields: ['_id', 'createdAt', 'updatedAt']
  }
};

const AuthorTC = composeMongoose(AuthorModel, customizationOptions);
const BookTC = composeMongoose(BookModel, customizationOptions);

// Add relationships
BookTC.addFields({
  author: {
    type: AuthorTC,
    resolve: async (source) => {
      if (!source.authorId) {
        return null;
      }
      const author = await AuthorModel.findById(source.authorId);
      return author;
    }
  }
});

AuthorTC.addFields({
  books: {
    type: [BookTC],
    resolve: async (source) => {
      const books = await BookModel.find({ authorId: source._id });
      return books;
    }
  }
});

// Add Queries
schemaComposer.Query.addFields({
  books: BookTC.mongooseResolvers.findMany(),
  book: BookTC.mongooseResolvers.findById(),
  authors: AuthorTC.mongooseResolvers.findMany(),
  author: AuthorTC.mongooseResolvers.findById(),
});

// Add Mutations
schemaComposer.Mutation.addFields({
  addAuthor: AuthorTC.mongooseResolvers.createOne(),
  addBook: BookTC.mongooseResolvers.createOne().wrapResolve(next => async rp => {
    // Ensure authorId is a valid ObjectId
    const authorId = new Types.ObjectId(rp.args.record.authorId);
    const author = await AuthorModel.findById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    
    rp.args.record.authorId = authorId;
    const book = await next(rp);
    
    await AuthorModel.findByIdAndUpdate(
      authorId,
      { $push: { books: book.record._id } }
    );
    
    return book;
  })
});

export default schemaComposer.buildSchema();
