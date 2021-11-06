const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Cidade = require("./../model/cidades"); // import do modelo pessoa

// Rota para raiz de Estados da API === OK
router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota Cidades operante" });
});

// Rota para listar todas as cidades === OK
router.get('/listAll', async (req,res) => {
  await Cidade.find({}).then((cidades) => {
      res.status(200).json(cidades);
  }).catch((err) => {
      res.status(204).json({message:"Nada foi encontrado"});
  });
});

// rota para buscar uma cidade por ID
router.get("/listId/:id", async (req,res) => {
  try{
      const id = req.params.id;
      if(!req.params.id){
          res.status(404).json({message: "Cidade não encontrada."});
          return;
      } else{
      const cidade = await Cidade.findById(id);
      res.status(200).json(cidade)
      }
  } catch (err) {
      res.status(204).json({message: "Cidade não encontrada."})
  }
});

// rota POST para cadastrar novas cidades === OK
router.post("/create", async (req,res) => {
  try {
      
      const cidade = req.body;
      
      // validação para não permitir que tenham campos em branco
      if(!cidade.Nome){
          res.status(400).json({message:"Preencha o nome."});
          return;
      }
      if(!cidade.QtdBairros){
          res.status(400).json({message:"Preencha quantos bairros."});
          return;
      }
      if(!cidade.Populacao){
          res.status(400).json({message:"Preencha a população."});
          return;
      }
      if(!cidade.Aniversario){
        res.status(400).json({message:"Preencha a data de aniversário."});
        return;
    }
      const cadastro = await new Cidade(cidade).save();
      res.status(201).json({message: `Cidade: ${cidade.Nome}, cadastrada com sucesso!`});
  } catch(err) {
      res.status(400).json({message: "Algo deu errado!"})
  }
})

//rota PUT para alteração de uma cidade por ID === OK
router.put("/update/:id", async (req,res) => {
  const id = req.params.id;
  
      if(!req.body.Nome){
              res.status(400).json({message:"Preencha o nome."});
              return;
          }
          if(!req.body.QtdBairros){
              res.status(400).json({message:"Preencha quantos bairros."});
              return;
          }
          if(!req.body.Populacao){
              res.status(400).json({message:"Preencha a população."});
              return;
          }
          if(!req.body.Aniversario){
            res.status(400).json({message:"Preencha a data de aniversário."});
            return;
        }
      await Cidade.updateOne({ _id:id}, req.body).then(() =>{
      
          res.status(200).json({message: `Cidade: ${req.body.Nome}, alterada com sucesso!`});
  
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "Cidade não encontrada, digite o ID corretamente."})
  })
})

// rota DELETE para deleção de uma cidade por ID === OK
router.delete("/delete/:id", async (req,res) => {
  if(req.params.id.length == 24){
      await Cidade.deleteOne({_id:req.params.id}).then(() => {
      res.status(200).json({message: `Cidade excluída com sucesso!`});
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "algo deu errado"});
  });
}else{
  res.status(400).json({message: "id precisa ter 24 caracteres"});
}
});

module.exports = router;
