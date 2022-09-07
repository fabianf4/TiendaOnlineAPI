// Conect to mysql
const connection = require('../drivers/driver_mysql')

const userCrud = {
    addUser: async (uuid, name, lastName, userName, email, password, callback) => {

        await connection.query(`select username from users where username="${userName}"`, (error, results) => {
            if (error) console.log(error)
            if (results[0]) {
                callback(results[0])
            } else {
                connection.query(`insert into users values("${uuid}","${name}","${lastName}","${userName}","${email}","${password}","2")`,
                    (error, results) => {
                        if (error) console.log(error)
                        callback()
                    })
            }
        })


    },
    findUserForUserName: async (userName, callback) => {
        connection.query(`select uuid, name, lastName, userName, email, password, rol from users where userName="${userName}"`,
            (error, results) => {
                if (error) console.log(error)

                callback(results)
            })
    },
    getAllUsers: async (callback) => {

        connection.query(`select * from users`,
            (error, results) => {
                if (error) console.log(error)

                callback(results)
            })
    },
    deleteUserforUuid: async (uuid,callback)=>{
        connection.query(`delete from users where uuid="${uuid}"`,
        (err,results)=>{
            if (err) throw error

            callback(results)
        })
    },
    addProductInCar: async (uuid,id,callback)=>{
        connection.query(`insert into usersProducts values ("${uuid}",${id})`,
        (err,results)=>{
            if (err) console.log(err)
            callback(results)
        })
    },
    deleteAllProductsFromCar: async (uuid, callback) => {
        connection.query(`delete from usersProducts where uuidUsers = "${uuid}"`,
        (err,results)=>{
            if (err) console.log(err)
            callback(results)
        })
    }
}

module.exports = userCrud