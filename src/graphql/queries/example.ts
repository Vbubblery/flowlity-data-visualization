import {ExampleType} from '../types/queries/example';
import {
  getAllExampleResolver,
} from '../resolvers/example';
import {GraphQLList} from 'graphql';


export const examples = {
  type: new GraphQLList(ExampleType),
  args: {},
  resolve: getAllExampleResolver,
};
