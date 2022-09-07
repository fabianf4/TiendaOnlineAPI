const {check, validationResult} = require('express-validator')

const validateCreate = [
    check('name')
        .exists().withMessage('Debe escribir un nombre de producto')
        .trim()
        .escape()
        .isString(),
    check('price')
        .exists().withMessage('Debe escribir un precio entero')
        .trim()
        .escape()
        .isNumeric(),
    check('amount')
        .exists().withMessage('Debe escribir una cantidad')
        .trim()
        .escape()
        .isNumeric(),
    check('imgUrl')
        .exists().withMessage('Debe ingresar una url valida')
        .trim()
        .isString(),
    (req,res,next) => {
        try{
            validationResult(req).throw()
            next()
        }catch(err){
            res.status(400).json({errors : err.array()})
        }
    }
]

const validateDelete = [    
    check('id')
        .exists().withMessage('Debe escribir un precio entero')
        .trim()
        .escape()
        .isNumeric(),
    (req,res,next) => {
        try{
            validationResult(req).throw()
            next()
        }catch(err){
            res.status(400).json({errors : err.array()})
        }
    }
]

module.exports = {validateCreate,validateDelete}