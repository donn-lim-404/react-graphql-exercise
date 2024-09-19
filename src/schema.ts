import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const Query: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    greet: {
      type: GraphQLString,
      resolve: () => 'Hello world!'
    }
  }
});

export const schema: GraphQLSchema = new GraphQLSchema({
  query: Query,
});