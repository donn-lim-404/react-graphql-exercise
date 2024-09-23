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
  it ('should fetch a null lead by id', async () =>  {
    await initDatabase();

    let response = await supertest(app)
      .post('/graphql')
      .send({
        query: `{ lead ( id: 99999 ) { id, name, email, mobile, postcode, service, serviceType } }`,
      })
      .expect(200);

    expect(response.body.data).toHaveProperty('lead');
    expect(response.body.data.lead).toEqual(null);
  });

  it('should fetch a lead by id', async () => {
    await initDatabase();

    let response = await supertest(app)
      .post('/graphql')
      .send({
        query: `{ lead ( id: 1 ) { id, name, email, mobile, postcode, service, serviceType } }`,
      })
      .expect(200);

    expect(response.body.data).toHaveProperty('lead');
    expect(response.body.data.lead).toEqual({
      id: 1,
      name: "John Doe",
      email: "johndoe@domain.com",
      mobile: 123456789,
      postcode: 6014,
      service: 1,
      serviceType: "pick-up"
    });
  });
});