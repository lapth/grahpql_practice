import { Document, Schema, model } from 'mongoose';

interface IAuthor {
  name: string;
  books: Schema.Types.ObjectId[];
}

interface AuthorDocument extends IAuthor, Document {}

const authorSchema = new Schema<AuthorDocument>({
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

export const AuthorModel = model<AuthorDocument>('Author', authorSchema);
