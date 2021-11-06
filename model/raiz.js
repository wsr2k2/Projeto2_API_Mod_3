const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const raizModel = new mongoose.Schema({
    Nome: { type:String, required: true },
    QtdBairros: { type: Number, required: true },
    Populacao: {type: Number, required: true },
    Aniversario: {type:String, required: true }
});

const Raiz = mongoose.model("raiz", raizModel);

module.exports = Raiz;
