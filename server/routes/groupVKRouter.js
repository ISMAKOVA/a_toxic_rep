const Router = require('express')
const router = new Router()
const groupVKController = require('../controllers/groupVKController')


// router.get('/fromVK/:id', groupVKController.getGroupVK)
router.get('/', groupVKController.getAll)
router.get('/:id', groupVKController.getOne)
router.get('/:id/fromVK', groupVKController.getGroupVK)
router.get('/:id/byUser', groupVKController.getAllByUserId)
router.post('/', groupVKController.create)
router.delete('/:id', groupVKController.delete)
router.put('/:id', groupVKController.update)


module.exports = router
