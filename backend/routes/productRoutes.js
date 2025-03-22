const express = require("express");
const { addProduct , getAllProducts } = require("../controller/productcontroller");

const router = express.Router();

router.post("/add",  addProduct); 
router.get("/" , getAllProducts) ;

module.exports = router;