import User from '../models/User';
import UserInterface from '../interfaces/userInterface';
import { serviceTypes } from '../utilities/constants';

export default class UserService {
  public static async getUsers(filters?: { [key: string] : any } | undefined): Promise<UserInterface[]> {
    try {
      if (filters) filters = { where: filters };
  
      return await User.findAll(filters);
    }
    catch (err) {
      throw err;
    }
  }

  public static async getUserById(id: number) {
    try {
      return await User.findByPk(id);
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
}