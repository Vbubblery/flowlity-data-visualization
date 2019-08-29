import {GraphQLNonNull, GraphQLString, GraphQLID} from 'graphql';

export const headerFragment = {
  id: {
    type: GraphQLNonNull(GraphQLID),
  },
  createdAt: {
    type: GraphQLNonNull(GraphQLString),
  },
  updatedAt: {
    type: GraphQLNonNull(GraphQLString),
  },
};
