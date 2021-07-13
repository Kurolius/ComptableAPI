const router = require('express').Router();
const clientsRepo = require('../repositories/clients')


router.post('/signup', async function(req, res, next) {
    let client = {}
    client.phone = req.body.phone
    client.email = req.body.email
    client.password = req.body.password
    client.role = "client"
    res.send(await clientsRepo.addClient(client));
    
  });

  router.post('/signin', async function(req, res, next) {
    let client = {}
    client.email = req.body.email
    client.password = req.body.password
    res.send(await clientsRepo.verifClient(client))
  });

  router.put('/update', async function(req, res, next) {
    let client = {}
    client.phone = req.body.phone
    client.email = req.body.email
    client.role = req.body.role
    res.send(await clientsRepo.updateClient(client));
  });

  router.put('/changepass', async function(req, res, next) {
    let client = {}
    client.email = req.body.email
    client.oldpassword = req.body.oldpassword
    client.newpassword = req.body.newpassword
    res.send(await clientsRepo.changepass(client));
  });

  router.delete('/delete', async function(req, res, next){
    const id = req.body.id
    const token = req.body.token
    const flag = await clientsRepo.verifToken(id,token)
    if(flag){
    let client= req.body.email
    res.send(await clientsRepo.deleteClient(client));
    }else{
      res.send("authentification error")
    }
  })

module.exports = router;