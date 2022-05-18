const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const ItemType = new GraphQLObjectType({
  name: "ItemType",
  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    qty: { type: GraphQLInt },
    itemPrice: { type: GraphQLInt },
    itemName: { type: GraphQLString },
    itemImage: { type: GraphQLString },
    itemId: { type: GraphQLString },
    itemDescription: { type: GraphQLString },
    itemCount: { type: GraphQLInt },
    giftMessage: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = ItemType;
