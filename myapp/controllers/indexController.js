const data = require("../database/models/Index")

const indexController = {
    header: function (req, res) {
        data.Producto.findAll()
        res.render('index', {productos: null});
    },
    
    headerLogueado: function(req, res){
        res.render("headerLogueado");
    },

    search: function (req, res) {
        res.render('search-results', {productos: null});
    },
};

module.exports = indexController;
