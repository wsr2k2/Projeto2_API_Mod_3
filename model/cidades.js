const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const cidadesModel = new mongoose.Schema({
    Nome: { type:String, required: true },
    QtdBairros: { type: Number, required: true },
    Populacao: {type: Number, required: true },
    Aniversario: {type:String, required: true }
});

const Cidade = mongoose.model("cidades", cidadesModel);

module.exports = Cidade;
