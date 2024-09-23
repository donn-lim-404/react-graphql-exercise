import { GraphQLError } from 'graphql';
import { messages } from './../utilities/constants';
import UserService from '../services/userService';

export default class CustomValidations {
  public static isEmpty(value: any) {
    if ((value === null || value === undefined)) {
      return true;
    }

    if (typeof value === 'string') {
      if (!value.trim()) {
        return true;
      }
    }

    return false;
  }

  public static isValidEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!email.match(regex)) {
      return false;
    }

    return true;
  }

  public static async isUniqueEmail(email: string) {
    const result = await UserService.getUserByEmail(email);

    if (result) {
      return false;
    }

    return  true;
  }
}