import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from "graphql";
import { ProductFragment } from "../fragments/product";

export const ProductInput = new GraphQLInputObjectType({
  name: "ProductInput",
  fields: ProductFragment
});

export const ProductUpdateInput = new GraphQLInputObjectType({
  name: "ProductUpdateInput",
  fields: {
    inventoryLevel: {
      type: GraphQLNonNull(GraphQLInt)
    }
  }
});
