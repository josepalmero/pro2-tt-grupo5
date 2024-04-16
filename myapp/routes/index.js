var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");



router.get("/", indexController.header);

router.get("/header_logueado", indexController.header_logueado);

router.get("/search", indexController.search);

module.exports = router;
