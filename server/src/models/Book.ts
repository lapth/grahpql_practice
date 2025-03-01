import mongoose from 'mongoose';

export type BookDTO = {
  id: string;
  name: string;
  genre: string;
  authorId: string;
}

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String
});

export default mongoose.model<BookDTO>('Book', bookSchema);
