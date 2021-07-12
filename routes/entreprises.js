const router = require('express').Router();
const entreprisesRepo = require('../repositories/entreprises')


router.get('/', async function(req, res, next) {
    res.send(await entreprisesRepo.getAllEnts());
});

router.get('/:id', async function(req, res, next) {
    res.send(await entreprisesRepo.getMyEnt(req.params.id));
});

router.get('/valide/:id', async function(req, res, next) {
    res.send(await entreprisesRepo.ValideENT(req.params.id));
});

router.post('/create', async function(req, res, next) {
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
    
  });

  router.put('/update', async function(req, res, next) {
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
  });

  router.delete('/delete', async function(req, res, next){
    let ENT= req.body.ClientId
    res.send(await entreprisesRepo.deleteEnt(ENT));
  })

module.exports = router;