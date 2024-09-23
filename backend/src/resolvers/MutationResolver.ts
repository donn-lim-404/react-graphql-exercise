import { GraphQLError, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from '../entities/UserType';
import UserService from '../services/userService';
import UserInterface from '../interfaces/userInterface';
import CustomValidations from '../validations/customValidations';
import { messages } from '../utilities/constants';
export class MutationResovler {
  private arguments = {
    name: { type: new GraphQLNonNull(GraphQLString)},
    email: { type: new GraphQLNonNull(GraphQLString)},
    mobile: { type: GraphQLInt },
    // postcode: { type: new GraphQLNonNull(GraphQLInt) },
    postcode: { type: GraphQLInt },
    service: { type: new GraphQLNonNull(GraphQLInt) },
  };

  public mutationType = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
      addUser: {
        type: UserType,
        args: this.arguments,
        resolve: async (_, { name, email, mobile, postcode, service}) => {
          const user: UserInterface = { name, email, mobile, postcode, service };
          return await UserService.addUser(user);
        }
      },
      register: {
        type: UserType,
        args: this.arguments,
        resolve: async (_, { name, email, mobile, postcode, service}) => {
          if (CustomValidations.isEmpty(name)) {
            throw new GraphQLError(messages.error.validation.name.missing);
          }
          
          if (CustomValidations.isEmpty(email)) {
            throw new GraphQLError(messages.error.validation.email.missing);
          }
          
          if (!CustomValidations.isValidEmail(email)) {
            throw new GraphQLError(messages.error.validation.email.invalid);
          }
          
          if (CustomValidations.isEmpty(postcode)) {
            throw new GraphQLError(messages.error.validation.postcode.missing);
          }
          
          if (CustomValidations.isEmpty(service)) {
            throw new GraphQLError(messages.error.validation.service.missing);
          }

          if (!CustomValidations.isValidService(service)) {
            throw new GraphQLError(messages.error.validation.service.invalid);
          }

          const user: UserInterface = { name, email, mobile, postcode, service };

          return await UserService.addUser(user);
        }
      }
    }
  })
}