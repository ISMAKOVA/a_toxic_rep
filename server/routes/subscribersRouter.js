const Router = require('express')
const router = new Router()
const subscribersController = require('../controllers/subscribersController')

router.get('/', subscribersController.getAll)
router.get('/:id', subscribersController.getOne)
router.post('/', subscribersController.create)
router.delete('/:id', subscribersController.delete)
router.put('/:id', subscribersController.update)

module.exports = router
