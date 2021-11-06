const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Raiz = require("./../model/raiz"); // import do modelo pessoa

// Rota para raiz de Estados da API === OK
router.get("/", (req, res) => {
  res.status(200).json({ message: "Bem vindos a página inicial da nossa API" });
});

module.exports = router;
