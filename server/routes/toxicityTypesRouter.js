const Router = require('express')
const router = new Router()
const toxicityTypesController = require('../controllers/toxicityTypesController')

router.get('/', toxicityTypesController.getAll)
router.get('/:id', toxicityTypesController.getOne)
router.get('/:id/:group_id/byPostId', toxicityTypesController.getOneByPostId)
router.get('/:group_id/byGroupId', toxicityTypesController.getAllByGroupId)
router.post('/', toxicityTypesController.create)
router.delete('/:id', toxicityTypesController.delete)
router.put('/:id', toxicityTypesController.update)

module.exports = router
