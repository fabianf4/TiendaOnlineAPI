const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const validateToken = [
    (req,res,next)=>{
        const {authorization} = req.headers        

        if (authorization){
            const token = authorization.split(' ')[1]
            try{
                jwt.verify(token,secret,(err,decoded)=>{
                    if (err) throw err
                    req.rol = decoded.data.rol
                    req.uuid = decoded.data.uuid
                })
                next()
            }catch(err){

                return res.status(403).json({
                    err,
                    in: "jwt"
                })
            }
        }else{
            res.status(403).json({
                error: 'No envio ningun token'
            })
        }
       
    }
]

module.exports = validateToken