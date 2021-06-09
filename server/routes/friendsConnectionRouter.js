const Router = require('express')
const router = new Router()
const friendsConnectionController = require('../controllers/friendsConnectionController')

router.get('/', friendsConnectionController.getAll)
router.get('/:id', friendsConnectionController.getOne)
router.post('/', friendsConnectionController.create)
router.delete('/:id', friendsConnectionController.delete)
router.put('/:id', friendsConnectionController.update)

module.exports = router
