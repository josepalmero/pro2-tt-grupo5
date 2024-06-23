var express = require('express');
var router = express.Router();

const indexController = require("../controllers/indexController");

//ruta del home page
router.get("/", indexController.index);

router.get("/", indexController.header);

router.get("/headerLogueado", indexController.headerLogueado);

module.exports = router;
