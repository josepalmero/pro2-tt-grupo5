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

    //agregar un producto 
    product_add: function(req, res){        
        //controles de acceso, si el usuario no este logueado 
        if (req.session.usuarioLogueado == undefined) {
            return res.redirect("/users/login");
        } else {
            res.render("product-add");
        };

          // validaciones de product-add
          let errors = validationResult(req)

          if (errors.isEmpty()) {

              let form = req.body;

              //nose si el segundo parametro este bien 
              let productoNuevo = {
                foto: form.archivo,
                nombre: form.producto,
                descripcion: form.descripcion
              }

              //create no se si esta bien 
              data.Producto.create(form, productoNuevo)
              .then(function (result) {
                  return res.redirect("/producto/detalle/", + result.id) //es id??
              })
              .catch(function (err) {
                  return console.log(err);
              });

          } else {
              return res.render("login", {
                  errors: errors.mapped(),
                  old: req.body
              })
          }
    },

      productDetail: function(req, res){
            let idProducto = req.params.id;

            let criterio = {
                include: [
                    {association: "usuario"} // el alias de la relacion 
                ],
                include: [
                    {association: "comentarios"} // relacion para los comentarios
                ]
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
        res.render('product_edit');
    },

    //  buscador de productos
    search: function(req, res){
       
        let busqueda = req.query.producto;  
        
        let filtrado = {
            where: {
                nombre: {[op.like]: "%" + busqueda + "%"}
            },
            order: [['createdAt', 'DESC']]
        }

        data.Producto.findAll(filtrado)
        .then(function(result){
            if (result) {
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
        let form = req.body
        let filtrado = {
            where: {
                id: form.id
            }
        }

        // control de acceso: borrar producto
        let userId = req.session.id;

        if (req.session.usuarioLogueado != undefined){
            if (form.idUsuario == userId) {
                data.Producto.destroy(filtrado)
                .then(function(result){
                    return res.redirect("/")
                })
                .catch(function(err){
                    return console.log(err);
                })
            } else {
                return
            }
        } 
        else {
            return res.redirect("/users/login")
        }
    }
}; 

module.exports = productoController;