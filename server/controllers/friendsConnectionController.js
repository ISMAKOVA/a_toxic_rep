const {Friends_connection} = require('../models/models')
const ApiError = require('../error/ApiError')

class FriendsConnectionController {
    async getAll(req, res) {
        const friends_connection = await Friends_connection.findAll()
        return res.json(friends_connection)
    }

    async getOne(req, res) {
        const {id} = req.params
        const friends = await Friends_connection.findOne({
            where: {id}
        })
        return res.json(friends)
    }

    async create(req, res, next) {
        try {
            const {is_friend, userVkId} = req.body
            const friends = await Friends_connection.create({is_friend, userVkId})
            return res.json(friends)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        const friends = await Friends_connection.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(friends)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }


    async update(req, res, next) {
        try {
            const {id, is_friend, userVkId} = req.body
            const friends = (await Friends_connection.findOne({
                where: {id}
            })).update({is_friend: is_friend, userVkId: userVkId})
            return res.json(friends)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FriendsConnectionController()
