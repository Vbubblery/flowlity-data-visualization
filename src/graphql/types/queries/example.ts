import {GraphQLObjectType} from 'graphql';
import {exampleFragment} from '../fragments/example';
import {headerFragment} from '../fragments/header';

export const ExampleType = new GraphQLObjectType({
  name: 'ExampleType',
  fields: {
    ...headerFragment,
    ...exampleFragment,
  },
});


