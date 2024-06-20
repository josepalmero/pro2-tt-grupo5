var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

//home page
router.get("index", indexController.index)

router.get("/", indexController.header);

router.get("/headerLogueado", indexController.headerLogueado);

module.exports = router;
