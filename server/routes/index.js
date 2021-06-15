const Router = require('express')
const router = new Router()

const user = require('./userRouter')
const userVK =require('./userVKRouter')
const groupVK =require('./groupVKRouter')
const answers = require('./answersRouter')
const commentsVK = require('./commentsVKRouter')
const favoriteGroups = require('./favoriteGroupsRouter')
const friendsConnection = require('./friendsConnectionRouter')
const postVK = require('./postVKRouter')
const subscribers = require('./subscribersRouter')
const toxicityTypes = require('./toxicityTypesRouter')

router.use('/user', user)
router.use('/userVK', userVK)
router.use('/groupVK', groupVK)
router.use('/answers', answers)
router.use('/commentsVK', commentsVK)
router.use('/favoriteGroups', favoriteGroups)
router.use('/friendsConnection', friendsConnection)
router.use('/postVK', postVK)
router.use('/subscribers', subscribers)
router.use('/toxicityTypes', toxicityTypes)

module.exports = router

