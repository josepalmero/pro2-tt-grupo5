const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const bcrypt = require("bcryptjs");
const {body} = require('express-validator');

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
    .isLength({min:4}).withMessage("La contrasenia debe tener al menos 4 caracteres")
    .custom(function(){
      bcrypt.hashSync(form.password, 10)
    }),
  body("fechaNacimiento")
    .isDate(),
  body("documento")
    .isInt(),
  body("fotoPerfil")
    // no va nada aca dentro?
];

//validaciones de login
const validations = [
  body("usuario")
    .notEmpty().withMessage("Desbes ingresar tu email").bail()
    .isEmail().withMessage("Debes completar con un email valido"),
  body("pass")
    .notEmpty().withMessage("Debes completar la contrasenia").bail()
    .custom(function(value, {req}){
      return data.Usuario.findOne({
        where: {email: req.body.email}
      })
      .then(function(usuario){
        if(usuario){
          //compara las contrasenias, y se es falso mandar 
          //el mensaje al usuario especificando el error 
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
  body("foto")
    // no va nada aca dentro?
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register", usuarioController.register); 

//ruta post del form de register
router.post("/register", usuarioController.registerForm);

router.post('/register', validacionesRegistro, usuarioController.store);  // store no existe

//ruta form login
router.get("/login", usuarioController.loginForm);

//ruta post del form de login y validaciones 
router.post("/login", validations, usuarioController.login);

//ruta de logout
router.post("/logout", usuarioController.logout);

router.get("/profile", usuarioController.profile);

router.get("/profile_edit", validacionesProfileEdit, usuarioController.profile_edit);

module.exports = router;