import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat
} from "graphql";
import { ProductFragment } from "../fragments/product";

export const ProductInput = new GraphQLInputObjectType({
  name: "ProductInput",
  fields: {
    ...ProductFragment
  }
});

export const ProductDataUpdateInput = new GraphQLInputObjectType({
  name: "ProductDataUpdateInput",
  fields: {
    date: {
      type: GraphQLNonNull(GraphQLFloat)
    },
    inventoryLevel: {
      type: GraphQLNonNull(GraphQLInt)
    }
  }
});

export const ProductDataAddInput = new GraphQLInputObjectType({
  name: "ProductDataAddInput",
  fields: {
    date: {
      type: GraphQLNonNull(GraphQLFloat)
    },
    inventoryLevel: {
      type: GraphQLNonNull(GraphQLInt)
    }
  }
});
