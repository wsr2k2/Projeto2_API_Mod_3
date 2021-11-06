const express = require("express");
const router = express.Router();

const listaCidades = [
  {
    Pais: "Espanha",
    Cidade: "Toledo",
    Fundacao: "193 a. C.",
    Populacao: "84.873",
    Area: "232 km²",
  },
  {
    Pais: "Suiça",
    Cidade: "Interlaken",
    Fundacao: "1133",
    Populacao: "5.300",
    Area: "4,30 km²",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota Cidades operante" });
});

router.get("/listacidades", (req, res) => {
  res.status(200).json(listaCidades);
});

router.get("/cidadesindex/:id", (req, res) => {
  const id = req.params.id - 1;
  const index = listaCidades[id];
  res.status(200).json({ index: index });
});

router.post("/cadastrocidade", (req, res) => {
  const cidade = req.body;

  if (!cidade.Pais) {
    res.status(400).json({
      message: "Nome do Pais da Cidade cadastrada não pode ser vazio!",
    });
    return;
  }
  if (!cidade.Cidade) {
    res.status(400).json({ message: "Nome da Cidade não pode ser vazia!" });
    return;
  }
  if (!cidade.Fundacao) {
    res
      .status(400)
      .json({ message: "Ano de fundação cadastrado não pode ser vazio!" });
    return;
  }
  if (!cidade.Populacao) {
    res
      .status(400)
      .json({ message: "População da Cidade cadastrada não pode ser vazia!" });
    return;
  }
  if (!cidade.Area) {
    res
      .status(400)
      .json({ message: "Área da Cidade cadastrada não pode ser vazia!" });
    return;
  }
  listaCidades.push(cidade);
  res.json({ message: "Cadastrado com sucesso!" });
});

router.put("/atualizarcidade/:id", (req, res) => {
  const cidade = req.body;
  const id = req.params.id - 1;
  listaCidades[id] = cidade;
  res.status(200).json({ message: "Atualizada com sucesso!" });
});

router.delete("/deletarcidade/:id", (req, res) => {
  const id = req.params.id - 1;
  delete listaCidades[id];
  res.json({ message: "Deletada com sucesso!" });
});

module.exports = router;
