import { GraphQLObjectType } from "graphql";

import { responseFragment } from "../fragments/response";

export const responseType = new GraphQLObjectType({
  name: "response",
  fields: {
    ...responseFragment
  }
});
