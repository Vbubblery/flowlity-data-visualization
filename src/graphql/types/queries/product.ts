import { ProductFragment } from "./../fragments/product";
import { GraphQLObjectType, GraphQLList } from "graphql";
import { DataType } from "./data";

export const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    ...ProductFragment,
    data: {
      type: new GraphQLList(DataType)
    }
  }
});
