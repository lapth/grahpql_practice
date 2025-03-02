import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADD_AUTHOR, GET_AUTHORS } from '../graphql/queries';

const AddAuthor = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAuthor({
        variables: { 
          record: {
            name
          }
        },
      });
      navigate('/authors');
    } catch (err) {
      console.error('Error adding author:', err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Author</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Author
        </Button>
      </Form>
    </Container>
  );
};

export default AddAuthor;
