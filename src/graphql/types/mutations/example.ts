import {GraphQLInputObjectType} from 'graphql';
import {exampleFragment} from '../fragments/example';

export const ExampleInput = new GraphQLInputObjectType({
  name: 'ExampleInput',
  fields: exampleFragment,
});
