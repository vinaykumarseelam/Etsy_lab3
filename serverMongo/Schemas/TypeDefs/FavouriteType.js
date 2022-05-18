const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const FavouriteType = new GraphQLObjectType({
  name: "FavouriteType",
  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    itemId: { type: GraphQLString },
  }),
});

module.exports = FavouriteType;
