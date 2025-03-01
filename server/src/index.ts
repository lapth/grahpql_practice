import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import typeDefs from './schemas';
import resolvers from './resolvers';
import connectDB from './database';
import dotenv from 'dotenv';

dotenv.config();

interface MyContext {
  token?: string;
}

async function startServer() {
  // Create Express app
  const app = express();
  
  // Create HTTP server
  const httpServer = http.createServer(app);
  
  // Create Apollo server
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  // Start Apollo server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }: { req: Request }) => ({ 
        token: req.headers.authorization 
      })
    })
  );

  // Start server
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });

  await connectDB();
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
