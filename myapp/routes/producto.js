const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const {body} = require('express-validator');

//validaciones de product-add y editar producto
const validations = [
    body("archivo")
        .notEmpty().withMessage("Debe seleccionar la imagen").bail(),
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

/* detalle del producto */
router.get("/detalle/:id", productoController.productDetail);

/* cargar producto */
router.get("/product_add", productoController.product_add_form);

/* POST de cargar producto  y validaciones */
router.post("/product_add", validations, productoController.product_add); 

/* Buscar un producto */ 
router.get("/search", productoController.search);  

/* Editar un producto*/
router.get("/product_edit", productoController.product_edit);

/* POST de Editar un producto recuperar info del form*/ 
router.post("/product_edit", validations, productoController.update);

/* Eliminar un producto*/
router.post("/delete", productoController.delete);

/* POST comentarios */
router.post("/detalle", validationsComentarios, productoController.comentarios);

module.exports = router;