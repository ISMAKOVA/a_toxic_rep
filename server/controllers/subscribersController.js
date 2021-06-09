const {Subscribers} = require('../models/models')
const ApiError = require('../error/ApiError')

class SubscribersController {
    async getAll(req, res) {
        const subscribers = await Subscribers.findAll()
        return res.json(subscribers)
    }

    async getOne(req, res) {
        const {id} = req.params
        const subs = await Subscribers.findOne({
            where: {id}
        })
        return res.json(subs)
    }

    async create(req, res, next) {
        try {
            const {is_admin, userVkId, groupVkId} = req.body
            const subs = await Subscribers.create({is_admin, userVkId, groupVkId})
            return res.json(subs)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async delete(req, res, next) {
        const {id} = req.params
        const subs = await Subscribers.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(subs)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }

    async update(req, res, next) {
        try {
            const {id, is_admin, userVkId, groupVkId} = req.body
            const subs = (await Subscribers.findOne({
                where: {id}
            })).update({is_admin: is_admin, userVkId: userVkId, groupVkId: groupVkId})
            return res.json(subs)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new SubscribersController()
