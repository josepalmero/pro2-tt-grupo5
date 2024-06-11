const { where } = require("sequelize");
const data = require("../database/models");
const bcryptjs = require("bcryptjs");
const op = data.Sequelize.Op;


const usuarioController = {
    login: function (req, res) {
        let formulario = req.body;
       
        let filtro = {
            where: [{email: formulario.email}]
        };

        data.Usuario.findOne()
            .then(function (result) {
                if(result != null) {
                    return res.render("login", { usuario: result });

                    //session no anda, y cookies tampoco 
                    req.session.usuarioLogueado = result
                    if(formulario.rememberme != undefined){
                        res.cookie("login", result.id, {maxAge: 1000 * 60 *35})
                    }
                    return res.redirect("/")
                } else {
                    return res.send("No hay mail parecidos a: " + formulario.email);
                }
            })   
            .catch(function (err) {
                return console.log(err);
            });
    },

    // romper si sale se la sesion
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie("login")
        return res.redirect("/")
    },

    //hashing
    register: function (req, res) {
        let formulario = req.body;
        
        // usamos bcryptjs
        let usuario = {
            email: formulario.email,
            contrasenia: bcryptjs.hashSync(formulario.contrasenia, 10)
        }

        data.Usuario.create()
            .then(function (result) {
                return res.redirect("/");
            })
            .catch(function (err) {
                return console.log(err);
            });
    },

    profile: function (req, res) {
        data.Usuario.findByPk()
            .then(function (result) {
                return res.render("profile", {
                    usuario: data.usuario,
                    productos: data.productos
                });
            })
            .catch(function (err) {
                return console.log(err);
            });
    },

    profile_edit: function (req, res) {
        data.Usuario.findByPk()
            .then(function (result) {
                return res.render("profile-edit", { usuario: result });
            })
            .catch(function (err) {
                return console.log(err);
            });
    },
};

module.exports = usuarioController;