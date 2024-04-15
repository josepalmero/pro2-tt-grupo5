const data = require("../db/data")

const indexController = {
    header: function (req, res) {
        res.render('index', {
            productos: data.productos
        });},

    search: function (req, res) {
        res.render('search-results');},
};

module.exports = indexController;
