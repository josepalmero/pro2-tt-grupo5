const data = require("../database/models/index")

const indexController = {
    header: function (req, res) {
        data.Usuario.findAll()
        .then(function(result) {

            return res.send(result)
            res.render('index', {productos: null});

        }).catch(function(error) {
            return console.log(error);
        })

    },
    
    headerLogueado: function(req, res){
        res.render("headerLogueado");
    },

    search: function (req, res) {
        res.render('search-results', {productos: null});
    },
};

module.exports = indexController;
