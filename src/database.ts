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
    console.log('Database synced successfully.');
  }
  catch (err) {
    console.error('Unable to sync to the database.', err);
  }
};

export const initDatabase = async () => {
  if (process.env.TEST_DATABASE === 'true') await testConnection();
  
  await syncDatabase();

  if (process.env.TEST_DATABASE === 'true') {
    try {
      const now: number = Date.now();
      const data = {
        name: 'John Doe',
        email: `john.doe@test${now}.com`,
        mobile: 1234,
        // postcode: 6000,
        service: 1
      };
      const user = await UserService.addUser(data);
      console.log(`Successfully created user record for: "${user.name}"`);
    }
    catch (err) {
      console.error('>>> internal error occured', err);
    }
  }
};