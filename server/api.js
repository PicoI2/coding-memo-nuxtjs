'use strict'

const express = require("express");
const api = express.Router();
const {sequelize, Language, Example, CodeExample} = require("./database.js")

api.get("/languages", async (req, res, next) => {
    const languages = await Language.findAll();
    res.send(languages);
});

api.get("/examples", async (req, res, next) => {
    const examples = await Example.findAll();
    res.send(examples);
});

api.get("/codeexamples/:language", async (req, res, next) => {
    const codeexamples = await CodeExample.findAll({where: {language_id: req.params.language}});
    res.send(codeexamples);
});

module.exports = api;