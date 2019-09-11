import {
  ProductInput,
  ProductDataUpdateInput,
  ProductDataAddInput
} from "../types/mutations/product";
import {
  createProductResolver,
  updateProductResolver,
  deleteProductResolver,
  addDataResolver,
  deleteDataFromProductResolver
} from "../resolvers/product";
import { responseType } from "../types/queries/response";
import { GraphQLNonNull, GraphQLString, GraphQLFloat } from "graphql";

export const createProductParse = {
  type: responseType,
  args: {
    productInput: {
      type: GraphQLNonNull(ProductInput)
    }
  },
  resolve: createProductResolver
};

export const addDataParse = {
  type: responseType,
  args: {
    productId: {
      type: GraphQLString
    },
    productName: {
      type: GraphQLString
    },
    dataInput: {
      type: GraphQLNonNull(ProductDataAddInput)
    }
  },
  resolve: addDataResolver
};

export const updateProductDataParse = {
  type: responseType,
  args: {
    productId: {
      type: GraphQLString
    },
    productName: {
      type: GraphQLString
    },
    productUpdateInput: {
      type: GraphQLNonNull(ProductDataUpdateInput)
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

export const deleteDataFromProductParse = {
  type: responseType,
  args: {
    productId: {
      type: GraphQLString
    },
    productName: {
      type: GraphQLString
    },
    date: {
      type: GraphQLFloat
    }
  },
  resolve: deleteDataFromProductResolver
};
