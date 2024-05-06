const data = require("../database/models")

const indexController = {
    header: function (req, res) {
        res.render('index', {productos: data.productos});
    },
    
    headerLogueado: function(req, res){
        res.render("headerLogueado");
    },

    search: function (req, res) {
        res.render('search-results', {productos: data.productos});
    },
};

module.exports = indexController;
