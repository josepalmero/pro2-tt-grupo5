const express = require("express");
const users = require('../db/data');

const usuarioController = {
    perfil_editado: function(req, res){
        res.render("profile-edit")},
};

module.exports = usuarioController;