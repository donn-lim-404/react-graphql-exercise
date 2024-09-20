import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './UserType';

export const LeadType = new GraphQLObjectType({
  name: 'LeadType',
  fields: {
    serviceType: { type: GraphQLString },
    postcode: { type: GraphQLInt },
    count: { type: GraphQLInt },
    users: { type: new GraphQLList(UserType) },
  },
});