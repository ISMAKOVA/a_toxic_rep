const Router = require('express')
const router = new Router()
const answersController = require('../controllers/answersController')

router.get('/',answersController.getAll)
router.get('/:id', answersController.getOne)
router.post('/', answersController.create)
router.delete('/:id',answersController.delete)
router.put('/:id',answersController.update)

module.exports = router
