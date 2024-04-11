const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/producto", productoController.producto);

router.get("/producto/", productoController.producto_add);

module.exports = router;