import { useQuery } from '@apollo/client';
import { Container, Table } from 'react-bootstrap';
import { GET_BOOKS } from '../graphql/queries';
import { Book } from '../types';

interface BooksData {
  books: Book[];
}

const BookList = () => {
  const { loading, error, data } = useQuery<BooksData>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container className="mt-4">
      <h2>Books</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {data?.books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.genre}</td>
              <td>{book.author.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookList;
