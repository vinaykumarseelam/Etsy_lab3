const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    about: { type: GraphQLString },
    _id: { type: GraphQLString },
    city: { type: GraphQLString },
    dob: { type: GraphQLString },
    email: { type: GraphQLString },
    fullAddress: { type: GraphQLString },
    gender: { type: GraphQLString },
    password: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    profilePic: { type: GraphQLString },
    username: { type: GraphQLString },
    shopName: { type: GraphQLString },
    shopImage: { type: GraphQLString },
    // __v: { type: GraphQLString},
  }),
});

module.exports = UserType;
