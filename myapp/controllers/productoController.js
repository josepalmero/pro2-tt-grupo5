const productoController = {
    product: function(req, res){
        res.render("product");},
    
    product_add: function(req, res){
        res.render("product-add");},
};

module.exports = productoController;