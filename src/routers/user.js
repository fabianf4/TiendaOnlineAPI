const {Router} = require ('express')
const router = new Router()

const conUser = require('../controllers/controll_user')

const {validateCreate,validateDelete, validateId} = require('../validators/validator_user')
const validate_token = require('../validators/validator_token')
const validate_isAdmin = require('../validators/validator_isAdmin')

router.get('/',validate_token,validate_isAdmin, conUser.getUsers)

router.post('/', validateCreate, conUser.addUser)

router.delete('/',validate_token, validateDelete, validate_isAdmin, conUser.deleteUser)

router.post('/login', conUser.findUserForUserName)

router.post('/car', validate_token, validateId, conUser.addProductInCar)

router.delete('/carDelete',validate_token,conUser.deleteProductsFromCar)

router.get('/getProducts',validate_token, conUser.getProductsFromCar)

module.exports = router
