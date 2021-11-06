const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const estadosModel = new mongoose.Schema({
    Nome: { type:String, required: true },
    Regiao: { type: String, required: true },
    Populacao: {type:Number, required: true },
    SalMinimo: {type:Number, required: true }
});

const Estado = mongoose.model("estados", estadosModel);

module.exports = Estado;
