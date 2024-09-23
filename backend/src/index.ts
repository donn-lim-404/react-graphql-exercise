import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import Schema from './schema';
import { initDatabase } from './database';

dotenv.config();

const app: Express = express();
const port: String | Number = process.env.PORT || 3001;

app.use(cors()); 

app.all(
  "/graphql",
  createHandler({
    schema: Schema.getSchema(),
  }),
);


const startServer = async () => {
  await initDatabase();
  
  app.listen(port, () => console.log(`Running a Graph API server at http://localhost:${port}/graphql`));
};

startServer();