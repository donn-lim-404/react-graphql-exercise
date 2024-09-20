import User from './../models/User';
import { UserInterface } from '../interfaces/user-interface';

export const testCreateUser = async ():Promise<UserInterface> => {
  try {
    const now: number = Date.now();

    const data: User = await User.create({
      name: 'john doe',
      email: `john.doe@test${now}.com`,
      mobile: 1234,
      postcode: 6000,
      service: 1
    });

    return data.get({ plain: true });
  }
  catch (err) {
    throw err;
  }
};