var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/", indexController.header);

router.get("/", indexController.login);

router.get("/", indexController.register);

router.get("/", indexConreoller.profile);

router.get("/", indexController.buscar);

module.exports = router;
