import mongoose from 'mongoose';
import { BookDTO } from './Book';

export type AuthorDTO = {
  id: string;
  name: string;
  books?: BookDTO[]
}

const authorSchema = new mongoose.Schema({
  name: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

export default mongoose.model<AuthorDTO>('Author', authorSchema);
