var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.header);

router.get("/headerLogueado", indexController.headerLogueado);

router.get("/search", indexController.search);

module.exports = router;
