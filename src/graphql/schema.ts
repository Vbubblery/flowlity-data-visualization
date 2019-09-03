import Query from "./queries";
import Mutation from "./mutations";
import { GraphQLSchema, GraphQLObjectType } from "graphql";

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries",
    fields: Query
  }),
  mutation: new GraphQLObjectType({
    name: "Mutations",
    fields: Mutation
  })
});
