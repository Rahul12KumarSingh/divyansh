const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controller/cartcontroller");
const router = express.Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/:userId", getCart);

module.exports = router;
