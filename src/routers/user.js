const {Router} = require ('express')
const router = new Router()

const conUser = require('../controllers/controll_user')

const validator_user = require('../validators/validator_user')
const validate_token = require('../validators/validator_token')

router.get('/',validate_token, conUser.getUsers)

router.post('/', validator_user, conUser.addUser)

//router.delete('/', deleteUser)

router.post('/login', conUser.findUserForUserName)

module.exports = router
