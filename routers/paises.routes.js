const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Pais = require("./../model/paises"); // import do modelo país

// Rota para raiz de países da API === OK
router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota países operante" });
});

// Rota para listar todos os países === OK
router.get('/listAll', async (req,res) => {
  await Pais.find({}).then((paises) => {
      res.status(200).json(paises);
  }).catch((err) => {
      res.status(204).json({message:"Nada foi encontrado"});
  });
});

// rota para buscar um país por nome.
router.get('/listName/:nome', async (req,res) => {
  await Pais.find({Nome: req.params.nome}).then((paises) => {
      res.status(200).json(paises);
  }).catch((err) => {
      res.status(204).json({message:"Nada foi encontrado"});
  });
});

// rota POST para cadastrar novos países === OK
router.post("/create", async (req,res) => {
  try {
      
      const pais = req.body;
      
      // validação para não permitir que tenham campos em branco
      if(!pais.Nome){
          res.status(400).json({message:"Preencha o nome."});
          return;
      }
      if(!pais.Populacao){
          res.status(400).json({message:"Preencha a população."});
          return;
      }
      if(!pais.Lingua){
          res.status(400).json({message:"Preencha a língua."});
          return;
      }
      if(!pais.PIB){
        res.status(400).json({message:"Preencha o PIB."});
        return;
    }
      const cadastro = await new Pais(pais).save();
      res.status(201).json({message: `País: ${pais.Nome}, cadastrado com sucesso!`});
  } catch(err) {
      res.status(400).json({message: "Algo deu errado!"})
  }
})

//rota PUT para alteração de um país por ID === OK
router.put("/update/:id", async (req,res) => {
  const id = req.params.id;
  
      if(!req.body.Nome){
              res.status(400).json({message:"Preencha o nome."});
              return;
          }
          if(!req.body.Populacao){
              res.status(400).json({message:"Preencha a região."});
              return;
          }
          if(!req.body.Lingua){
              res.status(400).json({message:"Preencha a população."});
              return;
          }
          if(!req.body.PIB){
            res.status(400).json({message:"Preencha o salário mínimo."});
            return;
        }
      await Pais.updateOne({ _id:id}, req.body).then(() =>{
      
          res.status(200).json({message: `País: ${req.body.Nome}, alterado com sucesso!`});
  
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "País não encontrado, digite a ID corretamente."})
  })
})

// rota DELETE para deleção de um país por ID === OK
router.delete("/delete/:id", async (req,res) => {
  if(req.params.id.length == 24){
      await Pais.deleteOne({_id:req.params.id}).then(() => {
      res.status(200).json({message: `País excluído com sucesso!`});
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "algo deu errado"});
  });
}else{
  res.status(400).json({message: "id precisa ter 24 caracteres"});
}
});

module.exports = router;
