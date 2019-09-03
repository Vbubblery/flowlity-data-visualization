import { GraphQLNonNull, GraphQLEnumType, GraphQLString } from "graphql";
import { ProductType } from "../queries/product";

const StatusEnumType = new GraphQLEnumType({
  name: "StatusEnumType",
  values: {
    Successful: {
      value: 1
    },
    Failed: {
      value: 0
    }
  }
});

export const responseFragment = {
  status: {
    type: GraphQLNonNull(StatusEnumType)
  },
  errors: {
    type: GraphQLString
  },
  product: {
    type: ProductType
  }
};
