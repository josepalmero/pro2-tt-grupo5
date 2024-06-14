const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/", productoController.product);

router.get("/detalle/:id", productoController.productDetail);

router.get("/product_add", productoController.product_add);

/* POST capturar la info del formulario */ 
router.post("/register", productoController.store);

/* Editar un producto*/
router.get("/product_edit", productoController.product_edit);

/* buscar un producto */ 
router.get("/search", productoController.search);  

/* POST  recuperar info del form*/ 
router.post("/update", productoController.update);

module.exports = router;