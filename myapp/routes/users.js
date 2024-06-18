const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {body} = require('express-validator');
const validations= [
  body("email")
  .notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .isEmail()
  .custom(function(value){
    return db.data.findOne({
      where: {email: value},
    })
    .then(function(user){
      if(user){
        throw new Error ('El email ingresado ya existe.')
      }
    })
  }),
  body("name")
  .notEmpty().bail(),
  body("password")
  .notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .isLength({min:4}).withMessage("La contrasenia debe tener al menos 4 caracteres"),// me falta encryptar
  body("fechaNacimiento")
  .isDate(),
  body("documento")
  .isInt(),
  body("fotoPerfil")
  ];

  
  

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register", usuarioController.register); 
router.post('/register', validations, usuarioController.store);

router.get("/login", usuarioController.login);

router.get("/profile", usuarioController.profile);

router.get("/profile_edit", usuarioController.profile_edit);

module.exports = router;