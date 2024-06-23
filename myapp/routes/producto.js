const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const {body} = require('express-validator');

//validaciones de product-add y editar producto
const validations = [
    body("archivo")
        .notEmpty().withMessage("Debe seleccionar la imagen").bail()
        .isURL().withMessage('Debes ingresar una URl valida'),
    body("producto")
        .notEmpty().withMessage("Debe ingresar el nombre del producto").bail(),
    body("descripcion")
        .notEmpty().withMessage("Debe ingresar la descripcion del producto").bail(),
];

//validaciones de comentarios
const validationsComentarios = [
    body("comentario")
        .notEmpty().withMessage('Debes ingresar algo. El comentario esta vacio').bail()
        .isLength({min:3}).withMessage('el comentario debe ser mas largo')
]

router.get("/", productoController.product);

router.get("/detalle/:id", productoController.productDetail);

router.get("/product_add", productoController.product_add_form);

/* POST de cargar producto  y validaciones */
router.post("/product_add", validations, productoController.product_add);

/* POST capturar la info del formulario */ 
// router.post("/register", productoController.store); 

/* Editar un producto*/
router.get("/product_edit", productoController.product_edit);

/* Buscar un producto */ 
router.get("/search", productoController.search);  

/* POST  recuperar info del form*/ 
router.post("/update", validations, productoController.update);

/* Eliminar un producto*/
router.post("/delete", productoController.delete);

/* POST comentarios */
router.post("/detalle", validationsComentarios, productoController.comentarios)
module.exports = router;