const { Client } = require('../models')
module.exports = {
    verifClient(mail,pass) {

        var x= User.count({
        where: {
          
            email: mail,
            password: pass 
          
        }
      });
      return x
    },
    getClientByEmail(email) { 
        return await Client.findOne({
            where: {       
            email 
            },
            attributes: ['id', 'phone', 'email', 'role']
        });
        },
    addClient(client) { 
        const created = await client.create({phone: client.phone, email: client.email,
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
    updateClient(client) {
        const __client = await this.getClientByEmail(client.email)
        console.log(__client)
        if (__client == null) return "can't update client"
        try{
        const updated = await client.update(client, {
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
    deleteClient(id) { 
        return await client.destroy({
            where: {
            id:id
            },
            attributes:['id', 'phone', 'email', 'role']
        });
    },

}
