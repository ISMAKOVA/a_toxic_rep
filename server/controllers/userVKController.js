const {Users_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class UserVKController {
    async getAll(req, res) {
        const users_vk = await Users_VK.findAll()
        return res.json(users_vk)
    }

    async getOne(req, res) {
        const {id} = req.params
        const userVK = await Users_VK.findOne({
            where: {id}
        })
        return res.json(userVK)
    }

    async create(req, res, next) {
        try {
            const {id, username, privacy, userId} = req.body
            const {avatar} = req.files
            let fileName = uuid.v4() + ".jpg"
            await avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
            const userVK = await Users_VK.create({id, username, privacy, userId, avatar: fileName})
            return res.json(userVK)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        const userVK = await Users_VK.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(userVK)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }

    async update(req, res, next) {
        try {
            const {id, avatar, username, privacy, userId} = req.body
            const userVK = (await Users_VK.findOne({
                where: {id}
            })).update({avatar: avatar, username: username, privacy: privacy, userId: userId})
            return res.json(userVK)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserVKController()
