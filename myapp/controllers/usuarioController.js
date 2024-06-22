// const   = require("sequelize");
const data = require("../database/models");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const { Store } = require("express-session");
const { localsName } = require("ejs");


const usuarioController = {
    registerForm: function(req, res){
        //trae el formulario de register
        //controles de acceso si el usuario esta logueado
         if (req.session.usuarioLogueado != undefined) {
            return res.redirect("/")
        } else {
            return res.render("register")
        } 
    },

    register: function (req, res) {
        // validaciones de register
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            
            let form = req.body;
            console.log(form)
        
            let usuarioNuevo = {
                email: form.email,
                name: form.name,
                contrasenia: bcrypt.hashSync(form.password, 10),
                fecha: form.fechaNacimiento,
                dni: form.documento,
                foto: form.fotoPerfil
            }

            if (req.session.usuarioLogueado == undefined) {
                data.Usuario.create(usuarioNuevo)
                .then(function (result) {
                    return res.redirect("/users/profile");
                })
                .catch(function (err) {
                    return console.log(err);
                });
            } else {
                return res.redirect("/");
            }
        } else {

            return res.render("register", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    loginForm: function(req, res){
        //trae el formulario de login
        //controles de acceso si el usuario esta logueado
        if(req.session.usuarioLogueado != undefined){
            return res.redirect("/");
        } else{
            return res.render("login");
        }
    },
    
    login: function (req, res) {
        // validaciones de login
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            
            
            return res.redirect("/");

        } else {

            return res.render("login", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    // romper si sale se la sesion
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie("login");
        return res.redirect("/")
    },

    profile: function (req, res) {
        /*data.Usuario.findByPk()
        .then(function (result) {
            return res.render("profile", {
                usuario: result.usuario, 
                productos: result.productos
            });
        })
        .catch(function (err) {
            return console.log(err);
        });*/
        return res.send()
    },

    profile_edit: function (req, res) {
        
        let id = req.params.id;
        let userId = req.session.id;

        // validaciones de profile edit
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            if (req.session.usuarioLogueado != undefined) {
                if (id == userId) {
                    data.Usuario.findByPk()
                    .then(function (result) {
                        return res.render("profile-edit", { usuario: result });
                    })
                    .catch(function (err) {
                        return console.log(err);
                    });
                } else {
                    return res.send("Usted no puede editar este perfil")
                }
            } else {
                return res.redirect("login")
            }
        } else {
            return res.render("login", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
};

module.exports = usuarioController;