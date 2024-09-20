import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from '../entities/UserType';
import UserService from '../services/user-service';
import UserInterface from '../interfaces/user-interface';

export class MutationResovler {
  private arguments = {
    name: { type: new GraphQLNonNull(GraphQLString)},
    email: { type: new GraphQLNonNull(GraphQLString)},
    mobile: { type: GraphQLInt },
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
      }
    }
  })
}