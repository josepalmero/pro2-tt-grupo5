const data = require("../db/data")

const indexController = {
    header: function (req, res) {
        res.render('index', {
            productos: data.productos
        });},
    
    header_logueado: function(req, res){
        res.render("headerLogueado");
    },

    search: function (req, res) {
        res.render('search-results');},
};

module.exports = indexController;
