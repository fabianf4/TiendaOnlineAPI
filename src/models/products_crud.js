const connection = require('../drivers/driver_mysql')

const productsCrud = {
    getProducts: (callback) => {
        connection.query(`select * from products`,
            (error, results) => {
                if (error) throw error
                callback(results)
            })
    },
    addProduct: (name, price, amount, imgUrl, callback) => {

        connection.query(`select max(id) as finalId from products`,
            (err, results) => {
                if (err) throw err
                let id = results[0].finalId + 1

                connection.query(`insert into products values (${id},"${name}",${price},${amount},"${imgUrl}")`,
                    (err, results) => {
                        if (err) throw err
                        callback(id)
                    })
            })


    },
    deleteProductForId: (id, callback) => {
        connection.query(`delete from products where id = ${id}`,
        (err,results)=>{
            if (err) throw err
            callback(results)
        })
    }
}

module.exports = productsCrud