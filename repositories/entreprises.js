const { Entreprise } = require('../models')
const moment = require('moment')
module.exports = {

    async getAllEnts() { 
        let __ents = await Entreprise.findAll({
        attributes: ['id', 'nomE', 'typeE', 'nbrAssocies','listWithNomAndPathCin','listGerant','sectActi', 'capital', 'validationComptable']
        });
        
        __ents.forEach(element => {
            element.listWithNomAndPathCin =element.listWithNomAndPathCin.toString().split(";")
            element.listGerant =element.listGerant.toString().split(";")
        });
        
        return __ents
      },
    async getMyEnt(Cid) { 
        let __ents = await Entreprise.findOne({
        where: {
            ClientId : Cid
        },
        attributes: ['id', 'nomE', 'typeE', 'nbrAssocies','listWithNomAndPathCin','listGerant','sectActi', 'capital', 'validationComptable']
        });
        __ents.listWithNomAndPathCin =__ents.listWithNomAndPathCin.toString().split(";")
        __ents.listGerant =__ents.listGerant.toString().split(";")
       
        return __ents
      },
    async addEnt(entreprise) {
        var listNomPath =""
        var listG =""
        entreprise.listWithNomAndPathCin.forEach(s=>{
            listNomPath = listNomPath + s + ";"
        });
        entreprise.listGerant.forEach(s=>{
            listG = listG + s + ";"
        });
        listNomPath = listNomPath.substring(0, listNomPath.length - 1);
        listG = listG.substring(0, listG.length - 1);
        const created = await Entreprise.create({nomE: entreprise.nomE, typeE: entreprise.typeE,
            nbrAssocies: entreprise.nbrAssocies, listWithNomAndPathCin: listNomPath,
            listGerant : listG, sectActi : entreprise.sectActi, capital : entreprise.capital,
            validationComptable : entreprise.validationComptable,ClientId: entreprise.ClientId,
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
        data.listGerant = created.listGerant
        data.sectActi = created.sectActi
        data.capital = created.capital
        data.validationComptable = created.validationComptable
        data.ClientId = created.ClientId

        }
        return data
    },
    async updateEnt(entreprise) {
        const __entreprise = await this.getMyEnt(entreprise.ClientId)
        if (__entreprise == null) return "can't update entreprise"
        if(entreprise.listWithNomAndPathCin){
            var listNomPath = "" 
            entreprise.listWithNomAndPathCin.forEach(s=>{
                listNomPath = listNomPath + s + ";"
            });
        }
        if(entreprise.listGerant){
            var listG = ""
            entreprise.listGerant.forEach(s=>{
                listG = listG + s + ";"
            });
        }
        let newEntData = {}
        newEntData.nomE = entreprise.nomE
        newEntData.typeE = entreprise.typeE
        newEntData.nbrAssocies = entreprise.nbrAssocies
        newEntData.listWithNomAndPathCin = listNomPath
        newEntData.listGerant = listG
        newEntData.sectActi = entreprise.sectActi
        newEntData.capital = entreprise.capital
        newEntData.validationComptable = entreprise.validationComptable
        newEntData.ClientId = entreprise.ClientId
        try{
        const updated = await Entreprise.update(newEntData, {
            where: {
            id: __entreprise.id
            }
        });
        if (updated == 1) return newEntData;
        else throw new Error()
        } catch(error){
        return "can't update this entreprise"
        }
    },
    async deleteEnt(ClientId) {        
        const __entreprise = await this.getMyEnt(ClientId)
        if (__entreprise == null) return "entreprise not found"
        await Entreprise.destroy({
            where: {
            id:__entreprise.id
            },
            attributes: ['id', 'nomE', 'typeE', 'nbrAssocies','listWithNomAndPathCin','listGerant','sectActi', 'capital', 'validationComptable']
        });
        return __entreprise;
    },
    async ValideENT(ClientId){
        let entreprise ={}
        entreprise.validationComptable = "valide"
        entreprise.ClientId = ClientId
        return(this.updateEnt(entreprise))
    }

}
