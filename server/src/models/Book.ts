import { Document, Schema, model } from 'mongoose';

interface IBook {
  name: string;
  genre: string;
  authorId: Schema.Types.ObjectId;
}

interface BookDocument extends IBook, Document {}

const bookSchema = new Schema<BookDocument>({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true, index: true }
});

export const BookModel = model<BookDocument>('Book', bookSchema);
