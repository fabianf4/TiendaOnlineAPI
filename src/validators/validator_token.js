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
                    //console.log(decoded)
                })
                next()
            }catch(err){
                res.status(403).json({
                    err
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