import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import graphqlSchema from './graphql';
import connectDB from './database';
import dotenv from 'dotenv';

dotenv.config();

interface MyContext {
  token?: string;
}

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);
  
  // Create Apollo server
  const server = new ApolloServer<MyContext>({
    schema: graphqlSchema
  });

  // Start Apollo server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  // Start server
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
