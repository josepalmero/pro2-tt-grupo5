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

        /*res.render("product", {productos: data.productos});*/
    },

    product_add: function(req, res){
        res.render("product-add");
    },
      
        productDetail: function(req, res){
            let idPelicula = req.params.idPelicula;

            data.Producto.findByPk(idPelicula)
            .then(function(result){
                return res.render("product", {producto: result});
            })
            .catch(function(err){
                return console.log(err);
            });
            /*res.render("product", {productos: data.productos});*/

            /*modelo omentario*/
            
        },

    product_edit: function(req, res){
        res.render('product_edit');
    },

    busqueda: function(req, res){
        let busqueda = req.query.pelicula;
        
        let filtrado = {
            where: {
                title: {[op.like]: "%" + busqueda + "%"}
            }
        }

        db.Movie.findOne(filtrado)
        .then((result) => {
            return res.send(result)
        }).catch((err) => {
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