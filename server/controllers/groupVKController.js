const {Groups_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')


class GroupVKController {

    async getAll(req, res) {
        const groups_vk = await Groups_VK.findAll()
        return res.json(groups_vk)
    }

    async getOne(req, res) {
        const {id} = req.params
        const groupVK = await Groups_VK.findOne({
            where: {id}
        })
        return res.json(groupVK)
    }

    async create(req, res, next) {
        try {
            const {id, info, privacy, favoriteGroupId, userId} = req.body
            const {avatar} = req.files
            let fileName = uuid.v4() + ".jpg"
            await avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
            const groupVK = await Groups_VK.create({
                id, info, privacy, favoriteGroupId, userId, avatar: fileName
            })
            return res.json(groupVK)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        const groupVK = await Groups_VK.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(groupVK)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }

    async update(req, res, next) {
        try {
            const {id, info, avatar, privacy, favoriteGroupId, userId} = req.body
            const groupVK = (await Groups_VK.findOne({
                where: {id}
            })).update({info: info, avatar: avatar, privacy: privacy, favoriteGroupId: favoriteGroupId, userId: userId})
            return res.json(groupVK)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new GroupVKController()
