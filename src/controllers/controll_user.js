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

            await user_crud.addUser(uuid, name, lastName, userName, email, passwordHash)

            return res.status(200).json({
                name,
                lastName,
                userName,
                email,
                password: true
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    findUserForUserName: async (req, res) => {
        try {
            const { userName, password } = req.body

            user_crud.findUserForUserName(userName, async (result) => {

                if (result[0]) {

                    const hashPassword = result[0].password

                    if (await compareHash(password, hashPassword)) {

                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: result[0].uuid
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
    }
}

module.exports = controll_user