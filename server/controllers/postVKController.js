const {Posts_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PostVKController {
    async getAll(req, res) {
        const posts_vk = await Posts_VK.findAll()
        return res.json(posts_vk)
    }

    async getOne(req, res) {
        const {id} = req.params
        const postVK = await Posts_VK.findOne({
            where: {id}
        })
        return res.json(postVK)
    }

    async create(req, res, next) {
        try {
            const {author_type, text, userVkId, groupVkId} = req.body
            const {picture} = req.files
            let fileName = uuid.v4() + ".jpg"
            await picture.mv(path.resolve(__dirname, '..', 'static', fileName))
            const postVK = await Posts_VK.create({author_type, text, userVkId, groupVkId, picture: fileName})
            return res.json(postVK)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async delete(req, res, next) {
        const {id} = req.params
        const postVK = await Posts_VK.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(postVK)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }

    async update(req, res, next) {
        try {
            const {id, author_type, text, userVkId, groupVkId} = req.body
            const postVK = (await Posts_VK.findOne({
                where: {id}
            })).update({author_type: author_type, text: text, userVkId: userVkId, groupVkId: groupVkId})
            return res.json(postVK)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new PostVKController()
