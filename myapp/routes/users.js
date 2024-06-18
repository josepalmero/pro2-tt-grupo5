const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {body} = require('express-validator');
const validations= [
  body("name")
  .notEmpty().withMessage("Este campo es obligatorio").bail()
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register", usuarioController.register); 

router.post('/register', validations, usuarioController.store);

router.post("/login", usuarioController.login);

router.get("/login", usuarioController.loginForm);

router.get("/profile", usuarioController.profile);

router.get("/profile_edit", usuarioController.profile_edit);

module.exports = router;