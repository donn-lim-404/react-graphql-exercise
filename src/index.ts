import express, { Express } from 'express';
import dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema';

dotenv.config();

const app: Express = express();
const port: String | Number = process.env.PORT || 3001;

app.all(
  "/graphql",
  createHandler({
    schema: schema,
  }),
),
 
app.listen(port, () => console.log(`Running a Graph API server at http://localhost:${port}/graphql`));