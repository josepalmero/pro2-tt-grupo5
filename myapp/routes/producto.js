const express = require("express");
const router = express.Router();

router.get("/producto", function(req, res){
    res.render("product");
})

router.get("/producto/", function(req, res){
    res.render("product-add");
})


module.exports = router;