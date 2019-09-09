import { ProductFragment } from "./../fragments/product";
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from "graphql";
import { DataType } from "./data";
import { DataFragment } from "../fragments/data";

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
