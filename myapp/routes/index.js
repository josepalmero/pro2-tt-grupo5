var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/", function (req, res) {
  res.render('headerLogueado')
});

router.get("/", function (req, res) {
  res.render('login')
});

router.get("/", function (req, res) {
  res.render('register')
});

router.get("/", function (req, res) {
  res.render('profile')
});

router.get("/", function (req, res) {
  res.render('search-results')
});

module.exports = router;
