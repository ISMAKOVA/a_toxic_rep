const Router = require('express')
const router = new Router()
const userVKController = require('../controllers/userVKController')

router.get('/',userVKController.getAll )
router.get('/:id', userVKController.getOne)
router.post('/', userVKController.create)
router.delete('/:id', userVKController.delete)
router.put('/:id', userVKController.update)

module.exports = router
