const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const paisesModel = new mongoose.Schema({
    Nome: { type:String, required: true },
    Populacao: { type: Number, required: true },
    Lingua: {type: String, required: true },
    PIB: {type:Number, required: true }
});

const Pais = mongoose.model("paises", paisesModel);

module.exports = Pais;
