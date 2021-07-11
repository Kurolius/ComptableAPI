const { Client } = require('../models')
module.exports = {
    async verifClient(mail,pass) {
        var flag = false
        var count= Client.count({
        where: {
          
            email: mail,
            password: pass 
          
        }
      });
      if(count != 0){
          flag = true
      }
      return flag
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
            password: client.password, role: client.role,
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
    async deleteClient(id) { 
        return await Client.destroy({
            where: {
            id:id
            },
            attributes:['id', 'phone', 'email', 'role']
        });
    },

}
