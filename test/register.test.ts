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
  it ('should register a lead', async () =>  {
    await initDatabase();

    let response = await supertest(app)
      .post('/graphql')
      .send({
        query: `mutation { register ( name: "Jane Doe", email: "janedoe@domain.com", mobile: 123456788, postcode: 6013, service: 0 )
          { id, name, email, mobile, postcode, service, serviceType } }`,
      })
      .expect(200);

    expect(response.body.data).toHaveProperty('register');
    expect(response.body.data.register).toEqual(
      expect.objectContaining({
        // id: 2,
        name: "Jane Doe",
        email: "janedoe@domain.com",
        mobile: 123456788,
        postcode: 6013,
        service: 0,
        serviceType: "delivery"
      })
    );
  });
});