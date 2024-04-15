var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/login", usuarioController.login);

router.get("/register", usuarioController.register);

router.get("/prfile", usuarioController.profile);

router.get("/users", usuarioController.profile_edit);

module.exports = router;
