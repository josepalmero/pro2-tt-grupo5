const data = require("../database/models");
const op = data.Sequelize.Op;

const productoController = {
    product: function(req, res){
        data.Producto.findAll()
        .then(function(result){
            return res.render("index", {producto: result});
        })
        .catch(function(err){
            console.log(err);
        });


        /*res.render("product", {productos: data.productos});*/
    },

    product_add: function(req, res){
        res.render("product-add");
    },
      
        
        productDetail: function(req, res){
            data.Producto.findByPk()
            .then(function(result){
                return res.render("product", {producto: result});
            })
            .catch(function(err){
                console.log(err);
            });
            
            /*res.render("product", {productos: data.productos});*/
        },
};

module.exports = productoController;