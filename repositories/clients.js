const { Client } = require('../models')
const moment = require('moment')
var CryptoJS = require("crypto-js");
var md5 = require('md5');
module.exports = { 
    async verifClient(clt) {
       
        var count= await Client.count({
        where: {
          
            email: clt.email,
            password: md5(clt.password)
          
        }
      });
      if(count != 0){
        const __client = await this.getClientByEmail(clt.email)
        let data = {}
        if (__client != null){
            var token = CryptoJS.AES.encrypt(md5(clt.password), 'SuckMyDick').toString();
            data.id = __client.id
            data.email = __client.email
            data.token = token
            data.role = __client.role
            return data
        }
      }
      return null
    },
    async getClientByEmail(email) { 
        return await Client.findOne({
            where: {       
            email 
            },
            attributes: ['id', 'phone', 'email', 'role']
        });
        },
    async addClient(client) {
        const created = await Client.create({phone: client.phone, email: client.email,
            password: md5(client.password), role: client.role,
            createdAt : moment().format("YYYY/MM/DD h:mm:ss"),
            updatedAt : moment().format("YYYY/MM/DD h:mm:ss"),
        });
        let data = {}
        if (created != null){
        data.id = created.id
        data.phone =  created.phone
        data.email = created.email
        data.role = created.role
        }
        return data
    },
    async updateClient(client) {
        const __client = await this.getClientByEmail(client.email)
        if (__client == null) return "can't update client"
        try{
        const updated = await Client.update(client, {
            where: {
            id: __client.id
            }
        });
        if (updated == 1) return client;
        else throw new Error()
        } catch(error){
        return "can't update this client"
        }
    },
    async changepass(client) {
        var count= await Client.count({
            where: {
              
                email: client.email,
                password: md5(client.oldpassword)  
              
            }
          });
        if(count != 0){
            const __client = await this.getClientByEmail(client.email)
            if (__client == null) return "can't update client"
            let newClt = {}
            newClt.password = md5(client.newpassword) 
            try{
            const updated = await Client.update(client, {
                where: {
                id: __client.id
                }
            });
            if (updated == 1) return client;
            else throw new Error()
            } catch(error){
            return "can't update this client"
            }
        }else{
            return "wrong password"
        }
    },
    async deleteClient(email) {
        const __client = await this.getClientByEmail(email)
        if (__client == null) return "client not found"
        await Client.destroy({
            where: {
            id:__client.id
            },
            attributes:['id', 'phone', 'email', 'role']
        });
        return __client;
    },
    async verifToken(idc,token){
        var bytes  = CryptoJS.AES.decrypt(token, 'SuckMyDick');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        var count= await Client.count({
            where: {
              
                id: idc,
                password: originalText 
              
            }
          });
          if(count != 0){
              return true
          }
          return false
    }

}
