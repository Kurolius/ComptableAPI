const { Entreprise } = require('../models')
module.exports = {
    
    async getMyEnt(Cid) { 
        return await Entreprise.findOne({
        where: {
            ClientId : Cid
        },
        attributes: ['id', 'nomE', 'typeE', 'nbrAssocies','listWithNomAndPathCin','listGerant','sectActi', 'capital', 'validationComptable']
        });
      },
    async addEnt(entreprise) { 
        const created = await Entreprise.create({nomE: entreprise.nomE, typeE: entreprise.typeE,
            nbrAssocies: entreprise.nbrAssocies, listWithNomAndPathCin: entreprise.listWithNomAndPathCin,
            listGerant : entreprise.listGerant, sectActi : entreprise.sectActi, capital : entreprise.capital,
            validationComptable : entreprise.validationComptable,
            createdAt : moment().format("YYYY/MM/DD h:mm:ss"),
            updatedAt : moment().format("YYYY/MM/DD h:mm:ss"),
        });
        let data = {}
        if (created != null){
        data.id = created.id
        data.nomE =  created.nomE
        data.typeE = created.typeE
        data.nbrAssocies = created.nbrAssocies
        data.listWithNomAndPathCin = created.listWithNomAndPathCin
        data.sectActi = created.sectActi
        data.capital = created.capital
        data.validationComptable = created.validationComptable
        }
        return data
    },
    async updateEnt(entreprise) {
        const __entreprise = await this.getMyEnt(entreprise.ClientId)
        if (__entreprise == null) return "can't update entreprise"
        try{
        const updated = await Entreprise.update(entreprise, {
            where: {
            id: __entreprise.id
            }
        });
        if (updated == 1) return entreprise;
        else throw new Error()
        } catch(error){
        return "can't update this entreprise"
        }
    },
    async deleteClient(id) { 
        return await Entreprise.destroy({
            where: {
            id:id
            },
            attributes: ['id', 'nomE', 'typeE', 'nbrAssocies','listWithNomAndPathCin','listGerant','sectActi', 'capital', 'validationComptable']
        });
    },

}
