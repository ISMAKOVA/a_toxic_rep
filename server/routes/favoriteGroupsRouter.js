const Router = require('express')
const router = new Router()
const favoriteGroupsController = require('../controllers/favoriteGroupsController')

router.get('/', favoriteGroupsController.getAll)
router.get('/:id', favoriteGroupsController.getOne)
router.post('/', favoriteGroupsController.create)
router.delete('/:id', favoriteGroupsController.delete)
router.put('/:id', favoriteGroupsController.update)

module.exports = router
