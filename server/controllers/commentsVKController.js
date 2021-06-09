const {Comments_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class CommentsVKController {
    async getAll(req, res) {
        const comments_vk = await Comments_VK.findAll()
        return res.json(comments_vk)
    }

    async getOne(req, res) {
        const {id} = req.params
        const comments = await Comments_VK.findOne({
            where: {id}
        })
        return res.json(comments)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const comments = await Comments_VK.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(comments)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })

    }

    async create(req, res) {
        const {author_type, text, userVkId, groupVkId, postVkId} = req.body
        const {picture} = req.files
        let fileName = uuid.v4() + ".jpg"
        await picture.mv(path.resolve(__dirname, '..', 'static', fileName))
        const comments = await Comments_VK.create({author_type, text, userVkId, groupVkId, postVkId, picture: fileName})
        return res.json(comments)
    }

    async update(req, res, next) {
        try {
            const {id, author_type, text, userVkId, groupVkId, postVkId} = req.body
            const comments = (await Comments_VK.findOne({
                where: {id}
            })).update({
                author_type: author_type,
                text: text,
                userVkId: userVkId,
                groupVkId: groupVkId,
                postVkId: postVkId
            })
            return res.json(comments)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CommentsVKController()
