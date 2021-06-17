const {Toxicity_types} = require('../models/models')
const ApiError = require('../error/ApiError')

class ToxicityTypesController {
    async getAll(req, res) {
        const toxicity_types = await Toxicity_types.findAll()
        return res.json(toxicity_types)
    }

    async getOne(req, res) {
        const {id} = req.params
        const toxicity_types = await Toxicity_types.findOne({
            where: {id}
        })
        return res.json(toxicity_types)
    }
    async getByPostId(req, res) {
        const {id, group_id} = req.params
        const toxicity_types = await Toxicity_types.findOne({
            where: {postVkId:id, groupVkId:group_id}
        })
        return res.json(toxicity_types)
    }

    async create(req, res, next) {
        try {
            const {
                toxic_value,
                is_rude,
                is_negative,
                contains_NER,
                userVkId,
                groupVkId,
                postVkId,
                commentsVkId
            } = req.body
            const toxicity_types = Toxicity_types.create({
                toxic_value, is_rude, is_negative, contains_NER, userVkId, groupVkId, postVkId, commentsVkId
            })
            return res.json(toxicity_types)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        const toxicity_type = await Toxicity_types.destroy({where: {id}})
            .then(() => {
                console.log('Данные удалены');
                return res.json(toxicity_type)
            })
            .catch(err => {
                next(ApiError.badRequest(err.message))
            })
    }

    async update(req, res, next) {
        try {
            const {
                id,
                toxic_value,
                is_rude,
                is_negative,
                contains_NER,
                userVkId,
                groupVkId,
                postVkId,
                commentsVkId
            } = req.body
            const toxicity_types = (await Toxicity_types.findOne({
                where: {id}
            })).update({
                toxic_value:  toxic_value, is_rude: is_rude,
                is_negative: is_negative, contains_NER: contains_NER, userVkId: userVkId,
                groupVkId: groupVkId, postVkId: postVkId, commentsVkId: commentsVkId
            })
            return res.json(toxicity_types)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ToxicityTypesController()
