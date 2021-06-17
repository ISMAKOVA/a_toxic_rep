const {Comments_VK} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios')


class CommentsVKController {
    async getAll(req, res) {
        const comments_vk = await Comments_VK.findAll()
        return res.json(comments_vk)
    }

    async getAllByGroupId(req, res) {
        const {id} = req.params
        const comments_vk = await Comments_VK.findAll({
            where: {groupVkId:id}}
        )
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
        const {id, date, author_type, text, picture, userVkId, groupVkId, postVkId} = req.body
        const comments = await Comments_VK.create({id,date, author_type, text,picture, userVkId, groupVkId, postVkId})
        return res.json(comments)
    }

    async update(req, res, next) {
        try {
            const {id,date, author_type, text,picture, userVkId, groupVkId, postVkId} = req.body
            const comments = (await Comments_VK.findOne({
                where: {id}
            })).update({
                author_type: author_type,
                picture:picture,
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


    async getCommentVK(req, res, next) {
        try {
            const {group_screen_name, post_id} = req.params
            await axios.get(process.env.TOXIC_API_PORT+'toxicity_py/api/comments/'+group_screen_name+'/'+post_id).then(response => {
                return res.send(response.data)
            });

        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

}

module.exports = new CommentsVKController()
