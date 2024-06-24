const data = require("../database/models");
const op = data.Sequelize.Op;
const { validationResult } = require('express-validator')

const productoController = {
    product: function(req, res){
        data.Producto.findAll()
        .then(function(result){
            return res.render("index", {producto: result});
        })
        .catch(function(err){
            return console.log(err);
        }); 
    },

    product_add_form: function(req, res) {
        //controles de acceso, si el usuario no este logueado 
        if (req.session.usuarioLogueado == undefined) {
            return res.redirect("/users/login");
        } else {
            res.render("product-add");
        };
    },

    //agregar un producto 
    product_add: function(req, res){        
        // validaciones de product-add
        let form = req.body;
        console.log(form)
        let errors = validationResult(req)

        let productoNuevo = {
            idUsuario: form.id,
            foto: form.archivo,
            nombre: form.producto,
            descripcion: form.descripcion
        }

        if (errors.isEmpty()) {
            data.Producto.create(productoNuevo)
            .then(function (result) {
                console.log(result)
                return res.redirect("/producto/detalle/" + result.id)
            })
            .catch(function (err) {
                return console.log(err);
            });

        } else {
            console.log("hola")
            return res.render("product-add", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

      productDetail: function(req, res){
            let idProducto = req.params.id;

            let criterio = {
                include: [
                    {association: "usuario"},  // el alias de la relacion 
                    {association: "comentarios", // relacion para los comentarios
                include: [
                    {association: "comentarioUsuario"}
                ]} 
                ],
            }

            data.Producto.findByPk(idProducto, criterio)
            .then(function(result){
                return res.render("product", {productos: result}); 
            })
            .catch(function(err){
                return console.log(err);
            });
        },

    product_edit: function(req, res){
        //queremos redirigirlo al formulario para editar el producto
        let id = req.params.productoId

        data.Producto.findByPk(id)
        .then(function(result){
            console.log(result)
            return res.send("sere"); 
        })
        .catch(function(err){
            return console.log(err);
        });
    },

    //  buscador de productos
    search: function(req, res){
       
        let busqueda = req.query.producto;  
        
        let filtrado = {
            where: {
                [op.or]: [
                    {nombre: {[op.like]: "%" + busqueda + "%"}},
                    {descripcion: {[op.like]: "%" + busqueda + "%"}}
                ]
            },
            order: [['createdAt', 'DESC']]
        }

        data.Producto.findAll(filtrado)
        .then(function(result){
            if (result.length >= 1) {
                return res.render("search-results", {productos: result}) 
            } else {
                return res.send('No hay resultados para su criterio de busqueda')
            }
        }).catch(function(err){
            return console.log(err);
        });
    },

    store: function(req, res) {
        let form = req.body;

        data.Producto.create(form)
        .then(function(result){
            return res.redirect("/product");
        })
        .catch(function(err){
            return console.log(err);
        });
    },

    // actualizar un producto en db a traves del form
    update: function(req, res) {
        let form = req.body;
        
        let filtrado = {
            where: {
                id: form.id
            }
        } 
        
        // control de acceso: editar producto 
        let userId = req.session.id;

        let errors = validationResult(req)
        if (errors.isEmpty()) {
            if ( req.session.usuarioLogueado != undefined) {
                if (form.idUsuario == userId) {
                    data.Producto.update(form, filtrado)
                    .then(function(result){
                        return res.redirect("/product/id" + form.id);
                    })
                    .catch(function(err){
                        return console.log(err);
                    })
                } else {
                    return res.send("No tiene permiso para editar este producto")
                }
            } 
            else {
                return res.redirect("/users/login")
            } 
        } else {
            return res.render("product", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    //eliminar un producto de la base de datos
    delete: function(req, res) {

        let form = req.body;
        console.log(form)
        let filtrado = {
            where: {
                id: form.productoId
            }
        } 

        data.Producto.destroy(filtrado)
        .then(function(result){
            return res.redirect("/")
        })
        .catch(function(err){
            return console.log(err);
        })
        
    },

    comentarios: function(req,res) {
        let errors = validationResult(req)
        let form = req.body;

        let comentarioNuevo = {
            texto: form.comentario,
            idUsuario: form.idUsuario,
            idPost: form.idProducto
        }

        if (errors.isEmpty()) {
            data.Comentario.create(comentarioNuevo)
            .then(function(result){
                return res.redirect("/producto/detalle/" + form.idProducto)
            })
            .catch(function(err){
                return console.log(err);
            })
        } else {
            return res.send( {
                errors: errors.mapped(),
                old: req.body
            })
        }
    }
}; 

module.exports = productoController;