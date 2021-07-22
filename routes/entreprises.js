const router = require('express').Router();
const entreprisesRepo = require('../repositories/entreprises')
const clientsRepo = require('../repositories/clients')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './CinImg');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
const upload = multer({storage: storage});

router.get('/', async function(req, res, next) {
    res.send(await entreprisesRepo.getAllEnts());
});

router.get('/:id', async function(req, res, next) {
    res.send(await entreprisesRepo.getMyEnt(req.params.id));
});

router.post('/valide', async function(req, res, next) {
  const id = req.body.id
  const token = req.body.token
  const flag1 = await clientsRepo.verifToken(id,token)
  if(flag1){
    const flag2 = await clientsRepo.verifAdminRight(id,token)
    if(flag2){
      res.send(await entreprisesRepo.ValideENT(req.body.id));
    }else{
      res.send("you are not an admin")
    }
  }else{
    res.send("authentification error")
  }
});

router.post('/create',async function(req, res, next) {
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

  router.post('/addCinImg',upload.single('CinImg'),async function(req, res, next) {
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
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