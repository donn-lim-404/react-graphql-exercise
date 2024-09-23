import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import User from './models/User';
import UserService from './services/userService';

// const logging = (process.env.NODE_ENV === 'production') ? false : console.log;

export const db: Sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: process.env.DATABASE || 'database.sqlite',
  query: { raw: true },
  // logging,
  models: [User],
});

export const testConnection = async (): Promise<void> => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (err) {
    console.error('Unable to connect to the database.', err);
  }
};

export const syncDatabase = async ():Promise<void> => {
  try {
    await db.sync();
    // console.log('Database synced successfully.');
  }
  catch (err) {
    console.error('Unable to sync to the database.', err);
  }
};

export const initDatabase = async () => {
  if (process.env.TEST_DATABASE === 'true') await testConnection();
  
  await syncDatabase();

  // @TODO: add for test results; can remove later on
  try  {
    await UserService.findOrCreateUser({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      mobile:  123456789,
      postcode: 6014,
      service: 1
    });
  }
  catch (e) {
    console.error('Unable to find or create user "John Doe".', e);
  }
};