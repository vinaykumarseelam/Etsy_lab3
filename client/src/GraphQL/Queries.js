import { gql } from "@apollo/client";

export const GET_FAVOUTITES = (userId) => {
  return gql`
  {
    getFavourites(userId: "${userId}") {
      _id
      userId
      itemId
    }
  }
`;
};

export const GETUSER_BY_ID = (userId) => {
  return gql`
    {
      getUserById(userId: "${userId}") {
        _id
        about
        city
        dob
        email
        fullAddress
        gender
        password
        phoneNumber
        profilePic
        username
        shopName
        shopImage
      }
    }
  `;
};

export const GET_CART_ITEMS = (userId) => {
  return gql`
    {
      getCartItems(userId: "${userId}") {
        _id
        userId
        itemId
        qty
      }
    }
  `;
};

export const GET_PURCHASED_ITEMS = (userId) => {
  return gql`
    {
      getPurchasedItems(userId: "${userId}") {
        _id
        userId
        updatedAt
        qty
        itemPrice
        itemName
        itemImage
        itemId
        itemDescription
        itemCount
        giftMessage
        createdAt
      }
    }
  `;
};

export const GET_MY_PRODUCTS = (userId) => {
  return gql`
    {
      getMyProducts(userId: "${userId}") {
        _id
        userId
        updatedAt
        qty
        itemPrice
        itemName
        itemImage
        itemId
        itemDescription
        itemCount
        giftMessage
        createdAt
      }
    }
  `;
};
