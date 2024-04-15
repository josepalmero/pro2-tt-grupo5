const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/", productoController.product);

router.get("/product_add", productoController.product_add);

module.exports = router;