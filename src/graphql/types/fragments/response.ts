import {GraphQLNonNull, GraphQLEnumType} from 'graphql';

const StatusEnumType = new GraphQLEnumType({
  name: 'StatusEnumType',
  values: {
    Successful: {
      value: 1,
    },
    Failed: {
      value: 0,
    },
  },
});

export const responseFragment = {
  status: {
    type: GraphQLNonNull(StatusEnumType),
  },
};
