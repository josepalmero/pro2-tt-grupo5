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
      /*  let form = req.body;
        
        // usamos bcryptjs
        let usuario = {
            email: form.email,
            contrasenia: bcrypt.hashSync(form.contrasenia, 10)
        }

        data.Usuario.create()
            .then(function (result) {
                return res.redirect("/");
            })
            .catch(function (err) {
                return console.log(err);
            });*/
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
        let form = req.body;

        let filtro = {
            where: [{email: form.usuario}]
        };

        data.Usuario.findOne(filtro)
            .then(function (result) {
                if(result != null) {
                    //session no anda, y cookies tampoco 
                    //contrasenia hasheada
                    let check = bcrypt.compareSync(form.pass, result.contrasenia);
                
                    if(check){
                        req.session.usuarioLogueado = result
                        //cookies
                        if(form.rememberme != undefined){
                            res.cookie("idUsuario", result.id, {maxAge: 1000 * 60 *35});
                        }
                        return res.redirect("/");
                    } else{
                        return res.send("Contrasenia incorrecta"); //entra el if pero siempre la contrasenia esta mal 
                    }
                } else {
                    return res.send("No hay mail parecidos a: " + form.email);
                }
            })   
            .catch(function (err) {
                return console.log(err);
            });
    },

    storeLogin: function(req,res){
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let form = req.body;
            let usuario = {
                usuario: form.email,
                pass: bcrypt.hashSync(form.pass)
            }
            data.Usuario.create(usuario)
            .then(function (result) {
                return res.redirect("/users/login")
            })
            .catch(function (err) {
                return console.log(err);
            });
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