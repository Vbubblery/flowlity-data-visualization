import {GraphQLNonNull, GraphQLString} from 'graphql';

export const exampleFragment = {
  name: {
    type: GraphQLNonNull(GraphQLString),
  },
  path: {
    type: GraphQLNonNull(GraphQLString),
  },
};
