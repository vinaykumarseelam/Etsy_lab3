const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const CartType = new GraphQLObjectType({
  name: "CartType",
  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    itemId: { type: GraphQLString },
    qty: { type: GraphQLInt },
  }),
});

module.exports = CartType;
