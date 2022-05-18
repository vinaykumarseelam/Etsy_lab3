import graphql from "graphql";
import Favourites from "../models/favourites";
import FavouriteType from "./TypeDefs/FavouriteType";
import cartdb from "../models/cart";
import purchasesDb from "../models/purchases";
const {
  GraphQLSchema,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");

import UserType from "./TypeDefs/UserType";
import CartType from "./TypeDefs/cartType";
import PurchaseType from "./TypeDefs/purchaseType";
import Userdb from "../models/model";
import ItemType from "./TypeDefs/ItemType";
import Items from "../models/items";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getFavourites: {
      type: new GraphQLList(FavouriteType),
      args: {
        userId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { userId } = args;
        console.log(userId);
        let data = await Favourites.find({ userId }).populate([
          "userId",
          "itemId",
        ]);
        let response = [];
        data = data.map((d) => {
          const { _id, userId, itemId } = d;
          response.push({
            _id,
            userId: JSON.stringify(userId),
            itemId: JSON.stringify(itemId),
          });
        });
        return response;
      },
    },

    getUserById: {
      type: new GraphQLList(UserType),
      args: { userId: { type: GraphQLString } },
      resolve: async (parent, { userId }) => {
        const user = await Userdb.findById(userId);
        console.log(user);
        return [user];
      },
    },
    getCartItems: {
      type: new GraphQLList(CartType),
      args: { userId: { type: GraphQLString } },
      resolve: async (parent, { userId }) => {
        let response = [];
        const data = await cartdb.find({ userId }).populate("itemId");

        data.map((d) => {
          const { _id, userId, itemId, qty } = d;
          response.push({
            _id,
            userId,
            itemId: JSON.stringify(itemId),
            qty,
          });
        });

        return response;
      },
    },

    getPurchasedItems: {
      type: new GraphQLList(PurchaseType),
      args: { userId: { type: GraphQLString } },
      resolve: async (parent, { userId }) => {
        return purchasesDb.find({ userId });
      },
    },

    getMyProducts: {
      type: new GraphQLList(ItemType),
      args: { userId: { type: GraphQLString } },
      resolve: async (parent, { userId }) => {
        return Items.find({ userId });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        push({
          id: length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery });
