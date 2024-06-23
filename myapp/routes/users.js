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
      .then(function(user){ // user es predeterminado?
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


//validaciones para el profile edit
const validacionesProfileEdit = [
  body("email")
    .notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isEmail()
    .custom(function(value){
      return data.Usuario.findOne({
        where: {email: value},
      })
      .then(function(user){ // user es predeterminado?
        if(user){
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

//ruta post del form de login
router.post("/login", usuarioController.login); 

//ruta de logout
router.post("/logout", usuarioController.logout);

router.get("/profile/:id", usuarioController.profile);


//ruta post del form de profile-edit y validacione
router.post("/profile_edit/:id", validacionesProfileEdit, usuarioController.profile_edit);

module.exports = router;