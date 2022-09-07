const product_crud = require('../models/products_crud')

const controll_user = {
    getProducts: async (req, res) => {

        try {
            product_crud.getProducts((results) => {
                res.status(200).json({ results })
            })
        } catch (error) {
            res.status(500).json(err)
        }

    }, addProduct: async (req,res) => {
        try {
            const {name,price,amount,imgUrl} = req.body
            product_crud.addProduct(name,price,amount,imgUrl,(id)=>{
                if(id){
                    res.status(200).json({
                        id,
                        price,
                        amount,
                        imgUrl
                    })
                }else{
                    throw 'Ocurrio un error en addProduct'
                }
                
            })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    deleteProduct: async (req,res)=>{
        try {
            const id = req.body.id
            product_crud.deleteProductForId(id,
                (results)=>{
                    if(results.affectedRows > 0){
                        return res.status(200).json({
                            "status": `Se elimino el producto con el id ${id}`
                        })
                    }else{
                        return res.status(200).json({
                            "status": "No se elimino ningun producto"
                        })
                    }
                    return res.status(200).json('ok')
                })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = controll_user