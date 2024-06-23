const data = require("../database/models");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
//const { Store } = require("express-session");
//const { localsName } = require("ejs");


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
        let form = req.body;

        let filtro = {
            where: [{email: form.usuario}]
        };

        data.Usuario.findOne(filtro)
        .then(function (result) {
            if(result != null) {
            //contrasenia hasheada
            let check = bcrypt.compareSync(form.pass, result.contrasenia);
                
            if(check){
                req.session.usuarioLogueado = result
                //cookies
                if(filtro.login != undefined){
                    res.cookie("idUsuario", result.id, {maxAge: 1000 * 60 *35});
                }
                return res.redirect("/");
                } else{
                    return res.send("Contrasenia incorrecta");
                }
            } else {
                return res.send("No hay email parecidos a: " + form.usuario);
            }
            })   
        .catch(function (err) {
            return console.log(err);
        }); 
    },


    // romper si sale se la sesion
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie("login");
        return res.redirect("/")
    },

    profile: function (req, res) {
        let id = req.params.id;

        let criterio = {
            include: [ 
                {association: "producto"},
                {association: "comentario"}
            ],
            order: [["createdAt", "DESC"]]
        }

        data.Usuario.findByPk(id, criterio)
        .then(function (result) {
            //return res.send(result)
            return res.render("profile", {usuario: result, productos: result.producto})
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
                    data.Usuario.findByPk(id)
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
            return res.render("profile-edit", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
};

module.exports = usuarioController;