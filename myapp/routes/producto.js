const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/producto", productoController.product);

router.get("/producto/", productoController.product_add);

module.exports = router;