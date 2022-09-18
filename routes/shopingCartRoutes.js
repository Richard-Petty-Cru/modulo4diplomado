const express = require("express");

const shopingCartController = require("./../controllers/shopingCartController");
const authController = require("./../controllers/authController");

const shopingRouter = express.Router();
//routes
shopingRouter
    .route("/product")
    .all(authController.protect)
    .post(shopingCartController.addProductoCart);


shopingRouter
    .route("/product/:id")
    .all(authController.protect)
    .delete(shopingCartController.deleteProductoCart);

shopingRouter
    .route("/pay")
    .all(authController.protect)
    .post(shopingCartController.payCart);


module.exports = shopingRouter;