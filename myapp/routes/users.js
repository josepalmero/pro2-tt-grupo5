const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register", usuarioController.register); 

router.get("/login", usuarioController.login);

router.get("/profile", usuarioController.prof-ile);

router.get("/profile_edit", usuarioController.profile_edit);

module.exports = router;