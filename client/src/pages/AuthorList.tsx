import { useQuery } from '@apollo/client';
import { Container, Table } from 'react-bootstrap';
import { GET_AUTHORS } from '../graphql/queries';
import { Author } from '../types';

interface AuthorsData {
  authors: Author[];
}

const AuthorList = () => {
  const { loading, error, data } = useQuery<AuthorsData>(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container className="mt-4">
      <h2>Authors</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {data?.authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.books?.map(book => book.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AuthorList;
