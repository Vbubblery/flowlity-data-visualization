import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt
} from "graphql";

export const FilterInput = new GraphQLInputObjectType({
  name: "FilterInput",
  fields: {
    date: {
      type: new GraphQLInputObjectType({
        name: "dateInput",
        fields: {
          dateStart: {
            type: GraphQLFloat
          },
          dateEnd: {
            type: GraphQLFloat
          }
        }
      })
    },
    level: {
      type: GraphQLInt
    }
  }
});
