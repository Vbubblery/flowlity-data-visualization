import { ProductType } from "./../types/queries/product";
import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from "graphql";
import {
  getAllProductsResolver,
  getProductResolver
} from "../resolvers/product";
import {
  SortNameEnumType,
  SortMethodEnumType
} from "../types/fragments/product";

export const products = {
  type: new GraphQLList(ProductType),
  args: {
    head: {
      type: GraphQLInt
    }
  },
  resolve: getAllProductsResolver
};

export const product = {
  type: ProductType,
  args: {
    productId: {
      type: GraphQLString
    },
    productName: {
      type: GraphQLString
    },
    sortBy: {
      type: SortNameEnumType
    },
    method: {
      type: SortMethodEnumType
    }
  },
  resolve: getProductResolver
};
