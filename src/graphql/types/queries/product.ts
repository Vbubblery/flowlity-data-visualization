import { ProductFragment } from "./../fragments/product";
import { GraphQLObjectType } from "graphql";

export const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    ...ProductFragment
  }
});
