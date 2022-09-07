const {check, validationResult} = require('express-validator')

const validateCreate = [
    check('name')
        .exists().withMessage('Debe escribir un nombre')
        .trim()
        .escape()
        .isString(),
    check('lastName')
        .exists().withMessage('Debe escribir un apellido')
        .trim()
        .escape()
        .isString(),
    check('userName')
        .exists().withMessage('Debe escribir un nombre de usuario')
        .trim()
        .escape(),
    check('email')
        .exists().withMessage('Debe escribir un email')
        .isEmail().withMessage('El email debe ser correcto')
        .normalizeEmail(),
    check('password')
        .exists().withMessage('Debe escribir una contraseña')
        .trim()
        .escape()
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
    check('uuid')
        .exists().withMessage('Debe escribir un uuid valido')
        .trim()
        .escape(),
    (req,res,next) => {
        try{
            validationResult(req).throw()
            next()
        }catch(err){
            res.status(400).json({errors : err.array()})
        }
    }
]

const validateId = [
    check('id')
        .exists().withMessage('Debe escribir un id valido')
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
module.exports = {validateCreate,validateDelete,validateId}