import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddAuthor from './pages/AddAuthor';
import AddBook from './pages/AddBook';
import AuthorList from './pages/AuthorList';
import BookList from './pages/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/add-author" element={<AddAuthor />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
