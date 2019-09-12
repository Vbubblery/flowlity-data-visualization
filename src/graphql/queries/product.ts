import { ProductType, NewProductType } from "./../types/queries/product";
import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat
} from "graphql";
import {
  getAllProductsResolver,
  getProductResolver,
  ProductsFilterResolver,
  ProductsViewResolver
} from "../resolvers/product";
import {
  SortNameEnumType,
  SortMethodEnumType
} from "../types/fragments/product";
import { FilterInput } from "../types/mutations/filter";

export const products = {
  type: new GraphQLList(ProductType),
  args: {
    head: {
      type: GraphQLInt
    }
  },
  resolve: getAllProductsResolver
};

export const ProductsFilter = {
  type: new GraphQLList(NewProductType),
  args: {
    names: {
      type: GraphQLNonNull(new GraphQLList(GraphQLString))
    },
    dateStart: {
      type: GraphQLNonNull(GraphQLFloat)
    },
    dateEnd: {
      type: GraphQLNonNull(GraphQLFloat)
    }
  },
  resolve: ProductsFilterResolver
};

export const ProductsView = {
  type: new GraphQLList(NewProductType),
  args: {
    names: {
      type: GraphQLNonNull(new GraphQLList(GraphQLString))
    },
    filter: {
      type: FilterInput
    }
  },
  resolve: ProductsViewResolver
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
