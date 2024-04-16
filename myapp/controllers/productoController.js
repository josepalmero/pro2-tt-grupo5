const data = require("../db/data");

const productoController = {
    product: function(req, res){
        res.render("product"),{productos: data.productos};
    },
    
    product_add: function(req, res){
        res.render("product-add");
    },
      
        
    productDetail: function(req, res){
        res.render("product"),{productos: data.productos};
    },
};

module.exports = productoController;