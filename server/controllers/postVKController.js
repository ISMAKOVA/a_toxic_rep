const {Posts_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios')


class PostVKController {
    async getAll(req, res) {
        const posts_vk = await Posts_VK.findAll()
        return res.json(posts_vk)
    }
    async getAllByGroupId(req, res) {
        const {id} = req.params
        const postVK = await Posts_VK.findAll({
            where: {groupVkId:id}
        })
        return res.json(postVK)
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
            const {id, author_type, text, date, userVkId, groupVkId, picture} = req.body
            const postVK = await Posts_VK.create({id, author_type, text, date, userVkId, groupVkId, picture})
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
            const {id, author_type, text, date, userVkId, groupVkId, picture} = req.body
            const postVK = (await Posts_VK.findOne({
                where: {id}
            })).update({author_type: author_type, text: text, userVkId: userVkId, groupVkId: groupVkId, date:date, picture:picture})
            return res.json(postVK)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getPostVK(req, res, next) {
        try {
            const id = req.params.id
            await axios.get(process.env.TOXIC_API_PORT+'toxicity_py/api/posts/'+id).then(response => {
                return res.send(response.data)
            });

        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new PostVKController()
