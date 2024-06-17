const data = require("../database/models");
const op = data.Sequelize.Op;

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

    product_add: function(req, res){
        res.render("product-add");
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
                return res.send(result)
                //return res.render("product", {productos: result}); //chequear el render 
            })
            .catch(function(err){
                return console.log(err);
            });
        },

    product_edit: function(req, res){
        res.render('product_edit');
    },

    search: function(req, res){
        let busqueda = req.query.producto;  
        
        let filtrado = {
            where: {
                nombre: {[op.like]: "%" + busqueda + "%"}
            },
            order: [
                ['id', 'DESC']
              ]
        }

        data.Producto.findAll(filtrado)
        .then(function(result){
            if (result) {
                return res.send(result)
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

    update: function(req, res) {
        let form = req.body;
            let filtrado = {
                where: {
                    id: form.id
                }
        }

        data.Producto.update(form, filtrado)
        .then(function(result){
            return res.redirect("/product/id/" + form.id);
        })
        .catch(function(err){
            return console.log(err);
        });
    }

};

module.exports = productoController;