const express = require("express");
const index = require('../db/data');

const indexController = {
    header: function (req, res) {
        res.render('headerLogueado');}

    login: function (req, res) {
        res.render('login');},
    
    register: function (req, res) {
        res.render('register');},

    profile:  function (req, res) {
        res.render('profile');},

    buscar: function (req, res) {
        res.render('search-results');},
};


module.exports = indexController;