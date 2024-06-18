// const   = require("sequelize");
const bcrypt = require("bcryptjs");
const data = require("../database/models");
const {validationResult}= require("express-validator");
const { Store } = require("express-session");
const { localsName } = require("ejs");


const usuarioController = {
    //hashing

    registerForm: function(req, res){
        //trae el formulario de login 
        return res.render("")

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

        // el usuario logueado ya no puede acceder al form de registro
        if (req.session.user != undefined) {
            return res.redirect("/")
        } else {
            return res.render("register")
        }
    },

    loginForm: function(req, res){
        //trae el formulario de login 
        return res.render("login")

    },
    

    login: function (req, res) {
        let form = req.body;

        let filtro = {
            where: [{email: form.usuario}]
        };


        data.Usuario.findOne()
            .then(function (result) {
                
                if(result != null) {
                    //return res.render("login", { usuario: result });
                
                
                    //session no anda, y cookies tampoco 
                    //contrasenia hasheada
                    console.log(result.contrasenia)
                    let check = bcrypt.compareSync(form.pass, result.contrasenia);
                 

                    console.log(check, "pass")
                

                    if(check){
                        req.session.usuarioLogueado = result
                        if(form.rememberme != undefined){
                            res.cookie("login", result.id, {maxAge: 1000 * 60 *35});
                            console.log("bien")

                            return res.redirect("/");

                        }else{
                            return res.redirect("/");
                        }
                    }else{
                        return res.send("No hay contrasenia parecida a: " + filtro);
                    }
                } else {
                    return res.send("No hay mail parecidos a: " + filtro);
                }

                //controles de acceso si el usuario esta logueado
                if(req.session.usuarioLogueado != undefined){
                    return res.redirect("/");
                } else{
                    return res.render("/users/login");
                }

            })   
            .catch(function (err) {
                return console.log(err);
            });
    },
    store: (req,  res ) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let form =req.body;
        let user = {
            name:form.name,
            email:form.email,
            password:bcrypt.hashSync(form.password, 10)
        }

        data.User.create(User)
        .then((result) => {
            return res.redirect("/users/login");
        }).catch((err) => {
            return console.log(err);
        });
        }
    },

    // romper si sale se la sesion
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie("login")
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