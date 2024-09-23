import User from '../models/User';
import UserInterface from '../interfaces/userInterface';
import { serviceTypes } from '../utilities/constants';

export default class UserService {
  public static async getUsers(filters?: { [key: string] : any } | undefined): Promise<UserInterface[]> {
    try {
      if (filters) filters = { where: filters };
  
      const users = await User.findAll(filters);
      users.map((user: UserInterface) => { user.serviceType = serviceTypes[user.service] });

      return users;
    }
    catch (err) {
      throw err;
    }
  }

  public static async getUserById(id: number) {
    try {
      const user: any = await User.findByPk(id);

      if (user) {
        user.serviceType = serviceTypes[user.service];
      }

      return user;
    }
    catch (err) {
      throw err;
    }
  }

  public static async getUserByEmail(email: string) {
    try {
      return await User.findOne({ where: { email } });
    }
    catch (err) {
      throw err;
    }
  }

  public static async addUser(data: UserInterface): Promise<UserInterface> {
    try {
      const user: User = await User.create(data);
      const userData: UserInterface = user.get({ plain: true });
      userData.serviceType = serviceTypes[user.service];

      return userData;
    }
    catch (err) {
      throw err;
    }
  }

  public static async findOrCreateUser(data: any) {
    try {
      await User.findOrCreate({ where: data, defaults: data });
    }
    catch (err) {
      throw err;
    }
  }
}