const data = require("../db/data");

const usuarioController = {
    login: function (req, res) {
        res.render('login');},
    
    register: function (req, res) {
        res.render('register');},

    profile:  function (req, res) {
        res.render('profile'), {productos: data.productos};
    },

    profile_edit: function(req, res){
        res.render("profile-edit")},
};

module.exports = usuarioController;