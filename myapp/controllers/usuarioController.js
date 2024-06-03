const data = require("../database/models");
const op = data.Sequelize.Op;


const usuarioController = {
    login: function (req, res) {
        data.Usuario.create()
        .then(function(result){
            return res.render("login", {usuario: result});
        })
        .catch(function(err){
            return console.log(err);
        });
       /*res.render('login')*/
    },
    
    register: function (req, res) {
        data.Usuario.create()
        .then(function(result){
            return res.render("register", {usuario: result});
        })
        .catch(function(err){
            return console.log(err);
        });
        /*res.render('register');*/
    },

    profile:  function (req, res) {
        data.Usuario.create()
        .then(function(result){
            return res.render("profile", {usuario: data.usuario, 
                productos: data.productos});
        })
        .catch(function(err){
            return console.log(err);
        });
        
        /*res.render('profile' , {usuario: data.usuario, 
            productos: data.productos
        });*/
    },
    
    profile_edit: function(req, res){
        data.Usuario.create()
        .then(function(result){
            return res.render("profile-edit", {usuario: result});
        })
        .catch(function(err){
            return console.log(err);
        });
        
        /*res.render('profile-edit');*/
    },
};

module.exports = usuarioController;