const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Estado = require("./../model/estados"); // import do modelo estado

// Rota para raiz de Estados da API === OK
router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota Estados operante" });
});

// Rota para listar todos os Estados === OK
router.get('/listAll', async (req,res) => {
  await Estado.find({}).then((estados) => {
      res.status(200).json(estados);
  }).catch((err) => {
      res.status(204).json({message:"Nada foi encontrado"});
  });
});

router.get('/list/:nome', async (req,res) => {
  await Estado.find({Nome: req.params.nome}).then((estados) => {
      res.status(200).json(estados);
  }).catch((err) => {
      res.status(204).json({message:"Nada foi encontrado"});
  });
});

// rota para buscar um Estado por ID
router.get("/listId/:id", async (req,res) => {
  try{
      const id = req.params.id;
      if(!req.params.id){
          res.status(404).json({message: "Estado não encontrado"});
          return;
      } else{
      const estado = await Estado.findById(id);
      res.status(200).json(estado)
      }
  } catch (err) {
      res.status(204).json({message: "Estado não encontrado"})
  }
});

// rota POST para cadastrar novos Estados === OK
router.post("/create", async (req,res) => {
  try {
      
      const estado = req.body;
      
      // validação para não permitir que tenham campos em branco
      if(!estado.Nome){
          res.status(400).json({message:"Preencha o nome."});
          return;
      }
      if(!estado.Regiao){
          res.status(400).json({message:"Preencha a região."});
          return;
      }
      if(!estado.Populacao){
          res.status(400).json({message:"Preencha a população."});
          return;
      }
      if(!estado.SalMinimo){
        res.status(400).json({message:"Preencha o salário mínimo."});
        return;
    }
      const cadastro = await new Estado(estado).save();
      res.status(201).json({message: `Estado: ${estado.Nome}, cadastrado com sucesso!`});
  } catch(err) {
      res.status(400).json({message: "Algo deu errado!"})
  }
})

//rota PUT para alteração de um Estado por ID === OK
router.put("/update/:id", async (req,res) => {
  const id = req.params.id;
  
      if(!req.body.Nome){
              res.status(400).json({message:"Preencha o nome."});
              return;
          }
          if(!req.body.Regiao){
              res.status(400).json({message:"Preencha a região."});
              return;
          }
          if(!req.body.Populacao){
              res.status(400).json({message:"Preencha a população."});
              return;
          }
          if(!req.body.SalMinimo){
            res.status(400).json({message:"Preencha o salário mínimo."});
            return;
        }
      await Estado.updateOne({ _id:id}, req.body).then(() =>{
      
          res.status(200).json({message: `Estado: ${req.body.Nome}, alterado com sucesso!`});
  
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "Estado não encontrado, digite a ID corretamente."})
  })
})

// rota DELETE para deleção de um Estado por ID === OK
router.delete("/delete/:id", async (req,res) => {
  if(req.params.id.length == 24){
      await Estado.deleteOne({_id:req.params.id}).then(() => {
      res.status(200).json({message: `Estado excluído com sucesso!`});
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "algo deu errado"});
  });
}else{
  res.status(400).json({message: "id precisa ter 24 caracteres"});
}
});

module.exports = router;
