import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType
} from "graphql";

export const SortNameEnumType = new GraphQLEnumType({
  name: "SortNameEnumType",
  values: {
    date: {
      value: "date"
    },
    inventoryLevel: {
      value: "inventoryLevel"
    }
  }
});

export const SortMethodEnumType = new GraphQLEnumType({
  name: "SortMethodEnumType",
  values: {
    DESC: {
      value: "DESC"
    },
    ASC: {
      value: "ASC"
    }
  }
});

export const ProductFragment = {
  productId: {
    type: GraphQLString
  },
  productName: {
    type: GraphQLNonNull(GraphQLString)
  },
  date: {
    type: GraphQLNonNull(GraphQLFloat)
  },
  inventoryLevel: {
    type: GraphQLNonNull(GraphQLInt)
  }
};
