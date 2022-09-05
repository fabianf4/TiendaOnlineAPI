const {Router} = require ('express')
const router = new Router()

const conUser = require('../controllers/controll_user')

const {validateCreate,validateDelete} = require('../validators/validator_user')
const validate_token = require('../validators/validator_token')

router.get('/',validate_token, conUser.getUsers)

router.post('/', validateCreate, conUser.addUser)

router.delete('/',validate_token, validateDelete, conUser.deleteUser)

router.post('/login', conUser.findUserForUserName)

module.exports = router
