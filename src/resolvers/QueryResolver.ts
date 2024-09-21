import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './../entities/UserType';
import UserService from '../services/user-service';
import { LeadType } from '../entities/LeadType';
import { serviceTypes } from '../utilities/constants';

export class QueryResolver {
  public queryType = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
      greet: {
        type: GraphQLString,
        resolve: () => 'Hello World!',
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async () => {
          return await UserService.getUsers();
        }
      },
      lead: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (_, { id }) => {
          return await UserService.getUserById(id);
        }
      },
      leads: {
        type: new GraphQLList(UserType),
        resolve: async () => {
          return await UserService.getUsers();
        }
      },
      leadsPerService: {
        type: new GraphQLList(LeadType),
        args: {
          service: { type: GraphQLInt },
        },
        resolve: async (_, { service }) => {
          let  filters;

          if (service) filters = { service };

          const result = await UserService.getUsers(filters);

          const test = result.reduce((acc, user) => {
            const key: any = serviceTypes[user.service];

            if (!acc[key]) {
              acc[key]  = { serviceType: key, count: 0, users: [] };
            }

            acc[key].users.push(user);
            acc[key].count++;

            return  acc;
          }, {} as { [key: number]: any });
      
          return Object.values(test);
        }
      },
      leadsPerPostcode: {
        type: new GraphQLList(LeadType),
        args: {
          postcode: { type: GraphQLInt },
        },
        resolve: async (_, { postcode }) => {
          let  filters;

          if (postcode) filters = { postcode };

          const result = await UserService.getUsers(filters);

          const test = result.reduce((acc, user) => {
            const key: any = user.postcode;

            if (!acc[key]) {
              acc[key]  = { postcode: key, count: 0, users: [] };
            }

            acc[key].users.push(user);
            acc[key].count++;

            return  acc;
          }, {} as { [key: number]: any });
      
          return Object.values(test);
        }
      }
    },
  });
}