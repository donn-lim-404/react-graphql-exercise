import { GraphQLSchema } from 'graphql';
import { QueryResolver } from './resolvers/QueryResolver';
import { MutationResovler } from './resolvers/MutationResolver';

export default class Schema {
  public static getSchema(): GraphQLSchema {
    return new GraphQLSchema({
      query: new QueryResolver().queryType,
      mutation: new MutationResovler().mutationType,
    });
  }
}