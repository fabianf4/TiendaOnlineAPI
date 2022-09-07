const isAdmin = [
    (req,res,next) => {
        if (req.rol != '1'){
            return res.status(403).json({
                err: "No tiene los permisos para acceder"
            })
        }
        next()
    }
]

module.exports = isAdmin