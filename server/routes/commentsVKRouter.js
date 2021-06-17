const Router = require('express')
const router = new Router()
const commentsVKController = require('../controllers/commentsVKController')

router.get('/', commentsVKController.getAll)
router.get('/:id', commentsVKController.getOne)
router.get('/:id/:post_id/fromVK', commentsVKController.getCommentVK)
router.post('/', commentsVKController.create)
router.delete('/:id', commentsVKController.delete)
router.put('/:id', commentsVKController.update)

module.exports = router
