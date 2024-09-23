import supertest from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import Schema from '../src/schema';
import { initDatabase } from '../src/database';

dotenv.config();

let app = express();

app.all(
  "/graphql",
  createHandler({
    schema: Schema.getSchema(),
  }),
);

describe('GraphQL API Tests', () => {
  it ('should fetch a list of  leads', async () =>  {
    await initDatabase();

    let response = await supertest(app)
      .post('/graphql')
      .send({
        query: `{ leads { id, name, email, mobile, postcode, service, serviceType } }`,
      })
      .expect(200);

    expect(response.body.data).toHaveProperty('leads');
    expect(response.body.data.leads).toBeInstanceOf(Array);
    expect(response.body.data.leads).toHaveLength(1);
    expect(response.body.data.leads).toEqual([{
      id: 1,
      name: "John Doe",
      email: "johndoe@domain.com",
      mobile: 123456789,
      postcode: 6014,
      service: 1,
      serviceType: "pick-up"
    }]);
  });
});