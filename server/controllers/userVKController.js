const {Users_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios')

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
    async getAllByUserId(req, res) {
        const {id} = req.params
        const groupVK = await Users_VK.findAll({
            where: {userId:id}
        })
        return res.json(groupVK)
    }

    async create(req, res, next) {
        try {
            const {id, username, avatar, privacy, userId} = req.body
            const userVK = await Users_VK.create({id, username, privacy, userId, avatar})
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

    async getUserVK(req, res, next) {
        try {
            const id = req.params.id
            await axios.get(process.env.TOXIC_API_PORT+'toxicity_py/api/users/'+id).then(response => {
                return res.send(response.data)
            });

        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new UserVKController()
