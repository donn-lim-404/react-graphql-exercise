import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString},
    email: { type: GraphQLString },
    mobile: { type: GraphQLInt },
    postcode: { type: GraphQLInt },
    service: { type: GraphQLInt },
    serviceType: { type: GraphQLString},
  }
});