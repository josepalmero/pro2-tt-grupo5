const express = require("express");
const producto = require("../db/data");

const productoController = {
    producto: function(req, res){
        res.render("product");},
    
    producto_add: function(req, res){
        res.render("product-add");},
};

module.exports = productoController;