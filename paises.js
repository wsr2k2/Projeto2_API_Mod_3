const express = require("express");
const router = express.Router();

const listaPaises = [
  {
    Nome: "Canada",
    Descobrimento: "1497",
    Populacao: "38.295.863",
    Area: "9.985.000 km²",
  },
  {
    Nome: "Irlanda",
    Descobrimento: "1.600 a.C.",
    Populacao: "4.937.963",
    Area: "70.273 km²",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota Países operante" });
});

router.get("/listapaises", (req, res) => {
  res.status(200).json(listaPaises);
});

router.get("/paisesindex/:id", (req, res) => {
  const id = req.params.id-1;
  const index = listaPaises[id];
  res.status(200).json({ index: index });
});

router.post("/cadastropais", (req, res) => {
  const pais = req.body;

  if (!pais.Nome) {
    res
      .status(400)
      .json({ message: "Nome do País cadastrado não pode ser vazio" });
    return;
  }
  if (!pais.Descobrimento) {
    res
      .status(400)
      .json({ message: "Ano do descobrimento cadastrado não pode ser vazio" });
    return;
  }
  if (!pais.Populacao) {
    res
      .status(400)
      .json({ message: "População do País cadastrado não pode ser vazio!" });
    return;
  }
  if (!pais.Area) {
    res
      .status(400)
      .json({ message: "Área do País cadastrado não pode ser vazio!" });
    return;
  }
  listaPaises.push(pais);
  res.json({ message: "Cadastrado com sucesso!" });
});

router.put("/atualizarpais/:id", (req, res) => {
  const pais = req.body;
  const id = req.params.id - 1;
  listaPaises[id] = pais;
  res.status(200).json({ message: "Atualizado com sucesso!" });
});

router.delete("/deletarpais/:id", (req, res) => {
  const id = req.params.id - 1;
  delete listaPaises[id];
  res.json({ message: "Deletado com sucesso!" });
});

module.exports = router;
