import { DataFragment } from "./../fragments/data";
import { GraphQLObjectType } from "graphql";

export const DataType = new GraphQLObjectType({
  name: "DataType",
  fields: {
    ...DataFragment
  }
});
