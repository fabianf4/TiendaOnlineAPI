// Conect to mysql
const connection = require('../drivers/driver_mysql')

const userCrud = {
    

    addUser : async (uuid, name,lastName,userName,email,password)=>{
        connection.query(`INSERT INTO USERS VALUES("${uuid}","${name}","${lastName}","${userName}","${email}","${password}","1")`, 
        (error, results) => {
            if (error) throw error
        })
    },
    findUserForUserName: async (userName,callback)=>{
        connection.query(`SELECT uuid, name, lastName, userName, email, password FROM USERS WHERE userName="${userName}"`, 
        (error, results) => {
            if (error) throw error

            callback(results)           
        })
    },
    getAllUsers: async (callback) => {
        
        connection.query(`SELECT * FROM USERS`,
        (error, results) => {
            if (error) throw error
            
            callback(results)
        })
    }
}

module.exports = userCrud