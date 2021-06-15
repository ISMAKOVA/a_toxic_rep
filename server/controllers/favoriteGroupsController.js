const {Favorite_groups} = require('../models/models')
const ApiError = require('../error/ApiError')

class FavoriteGroupsController {
    async getAll(req, res) {
        const favorite_groups = await Favorite_groups.findAll()
        return res.json(favorite_groups)
    }

    async getAllUserGroups(req, res) {
        const {id} = req.params
        const favorite_groups = await Favorite_groups.findAll({
            where: {userId:id}
        })
        return res.json(favorite_groups)
    }

    async create(req, res, next) {
        try {
            const {info, userId} = req.body
            const favorite_groups = await Favorite_groups.create({info, userId})
            return res.json(favorite_groups)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async delete(req, res, next) {
        const {id} = req.params
        const favorite_groups = await Favorite_groups.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(favorite_groups)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }

    async update(req, res, next) {
        try {
            const {id, info, userId} = req.body
            const favorite_groups = (await Favorite_groups.findOne({
                where: {id}
            })).update({info: info, userId: userId})
            return res.json(favorite_groups)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FavoriteGroupsController()
