const router = require('express').Router();
const paperAdvRepo = require('../repositories/paperAdvancements')


router.get('/:id', async function(req, res, next) {
    res.send(await paperAdvRepo.getMypaper(req.params.id))
});

module.exports = router;