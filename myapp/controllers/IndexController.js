const express = require("express");
const index = require('../db/data');

const indexController = {
    header: function (req, res) {
        res.render('headerLogueado');},

    search: function (req, res) {
        res.render('search-results');},
};

module.exports = indexController;