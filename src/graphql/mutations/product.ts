import { ProductInput, ProductUpdateInput } from "../types/mutations/product";
import {
  createProductResolver,
  updateProductResolver,
  deleteProductResolver
} from "../resolvers/product";
import { responseType } from "../types/queries/response";
import { GraphQLNonNull, GraphQLString } from "graphql";

export const createProductParse = {
  type: responseType,
  args: {
    productInput: {
      type: GraphQLNonNull(ProductInput)
    }
  },
  resolve: createProductResolver
};

export const updateProductParse = {
  type: responseType,
  args: {
    productId: {
      type: GraphQLString
    },
    productName: {
      type: GraphQLString
    },
    productUpdateInput: {
      type: GraphQLNonNull(ProductUpdateInput)
    }
  },
  resolve: updateProductResolver
};

export const deleteProductParse = {
  type: responseType,
  args: {
    productId: {
      type: GraphQLString
    },
    productName: {
      type: GraphQLString
    }
  },
  resolve: deleteProductResolver
};
