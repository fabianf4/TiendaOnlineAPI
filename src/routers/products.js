const {Router} = require ('express')
const router = new Router()

const conProducts = require('../controllers/controll_products')

const {validateCreate,validateDelete} = require('../validators/validator_product')
const validate_token = require('../validators/validator_token')
const validate_isAdmin = require('../validators/validator_isAdmin')

router.get('/', conProducts.getProducts)

router.post('/', validate_token, validate_isAdmin, validateCreate, conProducts.addProduct)

router.delete('/',validate_token, validate_isAdmin, validateDelete, conProducts.deleteProduct)

//router.post('/login', conUser.findUserForUserName)

module.exports = router
