const {Answers} = require('../models/models')
const ApiError = require('../error/ApiError')

class AnswersController {
    async getAll(req, res) {
        const answers = await Answers.findAll()
        return res.json(answers)
    }

    async getOne(req, res) {
        const {id} = req.params
        const answers = await Answers.findOne({
            where: {id}
        })
        return res.json(answers)
    }

    async create(req, res, next) {
        try {
            const {commentsVkId} = req.body
            const answers = await Answers.create({commentsVkId})
            return res.json(answers)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async delete(req, res, next) {
        const {id} = req.params
        const answers = await Answers.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(answers)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }

    async update(req, res, next) {
        try {
            const {id, commentsVkId} = req.body
            const answers = (await Answers.findOne({
                where: {id}
            })).update({commentsVkId: commentsVkId})
            return res.json(answers)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new AnswersController()
