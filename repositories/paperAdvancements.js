const { PaperAdvancement } = require('../models')
const { Paper } = require('../models')
const { Entreprise } = require('../models')
const moment = require('moment')
module.exports = {
    async getMypaper(Cid) {
        let __ents = await Entreprise.findOne({
            where: {
                ClientId : Cid
            },
            attributes: ['id']
        });
        const __idEnt = __ents.id
        return PaperAdvancement.findAll({
            attributes: ['advancement'],
            include: { model: Paper,attributes: ["type"]},
            where: {
                EntrepriseId : __idEnt,
            }
          });
      },
    async addPaperAdv(paperAdv) { 
        const created = await PaperAdvancement.create({EntrepriseId: paperAdv.EntrepriseId, PaperId : paperAdv.paperId,
            advancement: paperAdv.advancement,
            createdAt : moment().format("YYYY/MM/DD h:mm:ss"),
            updatedAt : moment().format("YYYY/MM/DD h:mm:ss"),
        });
        let data = {}
        if (created != null){
        data.EntrepriseId = created.EntrepriseId
        data.paperId =  created.paperId
        data.advancement = created.advancement
        }
        return data
    },
    async updatePaperAdv(paperAdv) {
        try{
        const updated = await PaperAdvancement.update(paperAdv, {
            where: {
                EntrepriseId : paperAdv.EntrepriseId,
                paperId : paperAdv.paperId
            }
        });
        if (updated == 1) return client;
        else throw new Error()
        } catch(error){
        return "can't update this PaperAdvancement"
        }
    },
    async deletePaperAdv(idE) { 
        return await PaperAdvancement.destroy({
            where: {
            id:idE
            },
            attributes:['EntrepriseId', 'paperId', 'advancement']
        });
    },

}
