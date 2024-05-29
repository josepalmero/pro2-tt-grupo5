const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/", productoController.product);

router.get("/product", productoController.productDetail);

router.get("/product_add", productoController.product_add);

/* POST capturar la info del formulario */ 
router.post("/register", productoController.store);

/* buscar un producto */ 
router.get("/busqueda", productoController.busqueda);

/* POST  recuperar indo del form*/ 
router.post("/update", productoController.update);

module.exports = router;