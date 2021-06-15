const {Groups_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios')


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

    async getAllByUserId(req, res) {
        const {id} = req.params
        const groupVK = await Groups_VK.findAll({
            where: {userId:id}
        })
        return res.json(groupVK)
    }

    async create(req, res, next) {
        try {
            const {id, info, privacy, avatar, userId} = req.body
            const groupVK = await Groups_VK.create({
                id, info, avatar, privacy, userId
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
            const {id, info, avatar, privacy,  userId} = req.body
            const groupVK = (await Groups_VK.findOne({
                where: {id}
            })).update({info: info, avatar: avatar, privacy: privacy,  userId: userId})
            return res.json(groupVK)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getGroupVK(req, res, next) {
        try {
            const id = req.params.id
            await axios.get(process.env.TOXIC_API_PORT+'toxicity_py/api/groups/'+id).then(response => {
                return res.send(response.data)
            });

        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

}

module.exports = new GroupVKController()
