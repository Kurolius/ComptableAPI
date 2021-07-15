const router = require('express').Router();
const entreprisesRepo = require('../repositories/entreprises')
const clientsRepo = require('../repositories/clients')

router.get('/', async function(req, res, next) {
    res.send(await entreprisesRepo.getAllEnts());
});

router.get('/:id', async function(req, res, next) {
    res.send(await entreprisesRepo.getMyEnt(req.params.id));
});

router.post('/valide', async function(req, res, next) {
  const id = req.body.id
  const token = req.body.token
  const flag = await clientsRepo.verifToken(id,token)
  if(flag){
    res.send(await entreprisesRepo.ValideENT(req.body.id));
  }else{
    res.send("authentification error")
  }
});

router.post('/create', async function(req, res, next) {
  const id = req.body.id
  const token = req.body.token
  const flag = await clientsRepo.verifToken(id,token)
  if(flag){
    let entreprise = {}
    entreprise.nomE = req.body.nomE
    entreprise.typeE = req.body.typeE
    entreprise.nbrAssocies = req.body.nbrAssocies
    entreprise.listWithNomAndPathCin = req.body.listWithNomAndPathCin
    entreprise.listGerant = req.body.listGerant
    entreprise.sectActi = req.body.sectActi
    entreprise.capital = req.body.capital
    entreprise.validationComptable = "en cours"
    entreprise.ClientId = req.body.ClientId
    res.send(await entreprisesRepo.addEnt(entreprise));
  }else{
    res.send("authentification error")
  }
  });

  router.put('/update', async function(req, res, next) {
    const id = req.body.id
    const token = req.body.token
    const flag = await clientsRepo.verifToken(id,token)
    if(flag){
      let entreprise = {}
      entreprise.nomE = req.body.nomE
      entreprise.typeE = req.body.typeE
      entreprise.nbrAssocies = req.body.nbrAssocies
      entreprise.listWithNomAndPathCin = req.body.listWithNomAndPathCin
      entreprise.listGerant = req.body.listGerant
      entreprise.sectActi = req.body.sectActi
      entreprise.capital = req.body.capital
      entreprise.validationComptable = req.body.validationComptable
      entreprise.ClientId = req.body.ClientId
      res.send(await entreprisesRepo.updateEnt(entreprise));
    }else{
      res.send("authentification error")
    }
  });

  router.delete('/delete', async function(req, res, next){
    const id = req.body.id
    const token = req.body.token
    const flag = await clientsRepo.verifToken(id,token)
    if(flag){
      let ENT= req.body.ClientId
      res.send(await entreprisesRepo.deleteEnt(ENT));
    }else{
      res.send("authentification error")
    }
  })

module.exports = router;