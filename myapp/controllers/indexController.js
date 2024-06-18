const data = require("../database/models")

const indexController = {
    header: function (req, res) {
        data.Producto.findAll()
        .then(function(result) {
            res.render('index', {productos: result});
        }).catch(function(error) {
            return console.log(error);
        })

    },
    
    headerLogueado: function(req, res){
        res.render("headerLogueado");
    },
};

module.exports = indexController;
