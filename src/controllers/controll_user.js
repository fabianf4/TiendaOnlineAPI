const user_crud = require('../models/user_crud')

const { v4: uuidv4 } = require('uuid')

const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


//Hash password
const encrypt = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}
//Compare hash
const compareHash = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

const controll_user = {
    getUsers: async (req, res) => {

        try {
            user_crud.getAllUsers((results) => {
                res.status(200).json({ results })
            })
        } catch (error) {
            res.status(500).json(error)
        }

    },
    addUser: async (req, res) => {
        try {
            //Generate UUID
            const { name, lastName, userName, email, password } = req.body
            const uuid = uuidv4()

            const passwordHash = await encrypt(password)

            await user_crud.addUser(uuid, name, lastName, userName, email, passwordHash,(err)=>{

                if (err){
                    return res.status(500).json({
                        eror: 'El nombre de usuario no esta disponible'
                    })
                }else {
                    return res.status(200).json({
                        name,
                        lastName,
                        userName,
                        email,
                        password: true,
                        status: 'Se registro el usuario'
                    })
                }
                
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    findUserForUserName: async (req, res) => {
        try {
            const { userName, password } = req.body

            user_crud.findUserForUserName(userName, async (result) => {

                if (result) {

                    const hashPassword = result[0].password

                    if (await compareHash(password, hashPassword)) {

                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: {
                                uuid : result[0].uuid,
                                rol: result[0].rol
                            }
                        }, secret)

                        return res.status(200).json({
                            "login": true,
                            token
                        })
                    }
                }
                return res.status(200).json({
                    "login": false
                })
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser : async (req,res)=>{
        try{
            const {uuid} = req.body
            
            user_crud.deleteUserforUuid(uuid,(results)=>{
                if(results.affectedRows > 0){
                    return res.status(200).json({
                        "status": `Se elimino el usuarion con el uuid ${uuid}`
                    })
                }else{
                    return res.status(200).json({
                        "status": "No se elimino ningun usuario"
                    })
                }
            })

            
        }catch(err){
            res.status(500).json(error)
        }
    },
    addProductInCar: async (req,res)=>{
        try {
            const id = req.body.id
            const uuid = req.uuid

            user_crud.addProductInCar(uuid,id,(results)=>{
                if(results){
                    res.status(200).json({
                        status: "Se agrego el producto al carro"
                    })
                }else{
                    res.status(200).json({
                        status: "No se agrego el producto al carro"
                    })
                }
            })  
        } catch (err) {
            res.status(500).json(error)
        }
    },
    deleteProductsFromCar: async (req,res)=>{
        try {
            const uuid = req.uuid

            user_crud.deleteAllProductsFromCar(uuid,(results)=>{
                if(results.affectedRows>0){
                    res.status(200).json({
                        status: "Se eliminaron los productos del carro"
                    })
                }else{
                    res.status(200).json({
                        status: "No se eliminaron los productos del carro"
                    })
                }
            })  
        } catch (err) {
            res.status(500).json(error)
        }
    }
}

module.exports = controll_user