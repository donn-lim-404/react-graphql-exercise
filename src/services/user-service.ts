import User from './../models/User';
import UserInterface from '../interfaces/user-interface';

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

  public static async addUser(data: UserInterface): Promise<UserInterface> {
    try {
      const user: User = await User.create(data);
  
      return user.get({ plain: true });
    }
    catch (err) {
      throw err;
    }
  }
}