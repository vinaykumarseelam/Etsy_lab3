const express = require("express");
const route = express.Router();
const user = require("../controller/User");
const passport = require("passport");
require("../passport")(passport);
let auth = passport.authenticate("jwt", { session: false });

//API

//kafka
route.post("/api/users/register", user.create);
route.post("/api/users/signin", user.findUser);
route.get("/api/users/signin", user.findUser);
route.post("/api/users/findShopDuplicates", user.findShopDuplicates);
route.put("/api/users/createShop/:id", user.createShop);
route.get("/api/users/getShopById/:id", user.getShopById);
route.put("/api/users/updateItemImageById/:id", user.updateItemImageById);
route.put("/api/users/updateShopImageById/:id", user.updateShopImageById);
route.put("/api/users/updateUser/:id", user.updateUser);
route.put("/api/users/updateUserAddress/:id", user.updateUserAddress);
route.post("/api/users/favourites/add", user.addToFavourite);
route.delete("/api/users/favourites/remove/:id", user.removeFromFavourite);
route.post("/api/users/favourites/list", user.favouriteList);

module.exports = route;
