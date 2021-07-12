const router = require('express').Router();
const paperAdvRepo = require('../repositories/paperAdvancements')


router.get('/:id', async function(req, res, next) {
    res.send(await paperAdvRepo.getMypaper(req.params.id))
});
router.post('/update', async function(req, res, next) {
    let paperAdv = {}
    paperAdv.EntrepriseId = req.body.EntrepriseId
    paperAdv.PaperId = req.body.PaperId
    paperAdv.advancement = req.body.advancement
    res.send(await paperAdvRepo.updatePaperAdv(paperAdv))
});
module.exports = router;