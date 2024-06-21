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
        //falta lo de createdAt
        // validaciones de register
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let form = req.body;
        
            let usuarioNuevo = {
                email: form.email,
                name: form.name,
                password: bcrypt.hashSync(form.password, 10),
                fechaNacimiento: form.fechaNacimiento,
                documento: form.documento,
                fotoPerfil: form.fotoPerfil
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
                        if(filtro.rememberme != undefined){
                            res.cookie("idUsuario", result.id, {maxAge: 1000 * 60 *35});
                        }
                        return res.redirect("/");
                    } else{
                        return res.send("Contrasenia incorrecta"); //entra el if pero siempre la contrasenia esta mal 
                    }
                } else {
                    return res.send("No hay email parecidos a: " + form.email);
                }
            })   
            .catch(function (err) {
                return console.log(err);
            });

        // validaciones de login
        let errors = validationResult(req)
        if (errors.isEmpty()) {

            let form = req.body;
            
            let usuario = {
                usuario: form.email,
                pass: bcrypt.hashSync(form.pass, 10),
                fecha: form.fecha,
                dni: form.dni,
                foto: form.foto
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