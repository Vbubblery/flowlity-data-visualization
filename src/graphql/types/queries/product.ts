import { ProductFragment } from "./../fragments/product";
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} from "graphql";
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

export const NewProductType = new GraphQLObjectType({
  name: "NewProductType",
  fields: {
    productName: {
      type: GraphQLNonNull(GraphQLString)
    },
    date: {
      type: GraphQLNonNull(GraphQLString)
    },
    inventoryLevel: {
      type: GraphQLNonNull(GraphQLInt)
    }
  }
});
