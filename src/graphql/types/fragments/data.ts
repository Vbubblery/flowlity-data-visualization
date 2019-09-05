import { GraphQLNonNull, GraphQLFloat, GraphQLInt } from "graphql";

export const DataFragment = {
  date: {
    type: GraphQLNonNull(GraphQLFloat)
  },
  inventoryLevel: {
    type: GraphQLNonNull(GraphQLInt)
  }
};
