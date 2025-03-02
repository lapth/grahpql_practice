import { schemaComposer } from 'graphql-compose';

// Book Type
export const BookTC = schemaComposer.createObjectTC(`
  type Book {
    id: ID!
    name: String
    genre: String
    authorId: ID!
  }
`);

// Author Type
export const AuthorTC = schemaComposer.createObjectTC({
  name: 'Author',
  fields: {
    id: 'ID!',
    name: 'String',
  },
});
