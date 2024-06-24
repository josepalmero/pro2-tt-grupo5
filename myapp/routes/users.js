const express = require('express');
const router = express.Router();
const data = require("../database/models");
const usuarioController = require('../controllers/usuarioController');
const bcrypt = require("bcryptjs");
const {body} = require('express-validator');
const { where } = require('sequelize');

//validaciones para el formulario de registro
const validacionesRegistro = [
  body("email")
    .notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isEmail()
    .custom(function(value){
      return data.Usuario.findOne({
        where: {email: value},
      })
      .then(function(user){ 
        if(user){
          throw new Error ('El email ingresado ya existe')
        }
      })
  }),
  body("name")
    .notEmpty().withMessage("Este campo no puede estar vacio").bail(),
  body("password")
    .notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isLength({min:4}).withMessage("La contrasenia debe tener al menos 4 caracteres"),
  body("fechaNacimiento")
    .isDate(),
  body("documento")
    .isInt(),
];

//validaciones para el login
const validations = [
  body("usuario")
  .notEmpty().withMessage("Desbes ingresar tu email").bail()
  .isEmail().withMessage("Debes completar con un email valido"),
  body("pass")
  .notEmpty().withMessage("Debes completar la contrasenia").bail()
  .custom(function(value, { req }){
    return data.Usuario.findOne({
      where: {email: req.body.usuario}
    })
    .then(function(usuario){
      if(usuario){
        let check = bcrypt.compareSync(req.body.pass, usuario.contrasenia);
        if(check == false){
          throw new Error ("Contrasenia incorrecta. Ingresa la contrasenia correcta");
        } else {
          req.session.usuarioLogueado = usuario;
        }
      } else {
        throw new Error ("No se encontro el usuario");
      }
    })
  })
];

//validaciones para el profile edit
const validacionesProfileEdit = [
  body("email")
    .notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isEmail()
    .custom(function(value){
      return data.Usuario.findOne({
        where: {email: value},
      })
      .then(function(usuario){
        if(usuario){
          throw new Error ('El email ingresado ya existe')
        }
      })
  }),
  body("usuario")
    .notEmpty().withMessage("Este campo no puede estar vacio").bail(),
  body("pass")
    .notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isLength({min:4}).withMessage("La contrasenia debe tener al menos 4 caracteres")
    .custom(function(){
      bcrypt.hashSync(form.password, 10)
    }),
  body("edad")
    .isDate(),
  body("dni")
    .isInt(),
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 

//ruta post del form de register
router.get("/register", usuarioController.registerForm);

router.post('/register', validacionesRegistro, usuarioController.register);

//ruta form login
router.get("/login", usuarioController.loginForm);

//ruta post del form de login y validaciones
router.post("/login", validations, usuarioController.login); 

//ruta de logout
router.post("/logout", usuarioController.logout);

router.get("/profile", usuarioController.profileForm);

router.get("/profile/:id", usuarioController.profile);

//ruta get del form de profile-edit 
router.get("/profile_edit/:id",  usuarioController.profileEdit); // :id va?

//ruta post del form de profile-edit y validacione
router.post("/profile_edit/:id", validacionesProfileEdit, usuarioController.update); 

module.exports = router;