const {Users} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')

const generateJwt = (id, username, email, avatar) => {
    return jwt.sign(
        {id: id, username: username, email: email, avatar: avatar},
        process.env.SECRET_KEY,
        {expiresIn: '72h'})
}
const generateJwt1 = (id, username, email) => {
    return jwt.sign(
        {id: id, username: username, email: email},
        process.env.SECRET_KEY,
        {expiresIn: '72h'})
}

class UserController {
    async registration(req, res, next) {
        const {username, email, password} = req.body
        const {avatar} = req.files
        let fileName = uuid.v4() + ".jpg"
        await avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
        if (!email || !password || !username) {
            return next(ApiError.badRequest('Некорректный username, email или password'))
        }
        const candidate1 = await Users.findOne({where: {email}})
        if (candidate1) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const candidate2 = await Users.findOne({where: {username}})
        if (candidate2) {
            return next(ApiError.badRequest('Пользователь с таким username уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Users.create({username, email, avatar: fileName, password: hashPassword})
        const token = generateJwt(user.id, username, email, avatar, fileName)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt1(user.id, user.username, email)
        return res.json({token})
    }

    async check(req, res) {
        console.log(req)
        const token = generateJwt1(req.user.id, req.user.username, req.user.email)
        console.log(token)
        return res.json({token})
    }

    async getAll(req, res) {
        const users = await Users.findAll()
        return res.json(users)
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await Users.findOne(
            {where: {id}},
        )
        return res.json(user)
    }

    async update(req, res, next) {
        let {id, username, email, password} = req.body
        let fileName;
        const cur_user = await Users.findOne({where: {id}});
        if(req.files){
            let {avatar} = req.files
            fileName = uuid.v4() + ".jpg";
            await avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
        }else {
            fileName = cur_user.avatar;
        }

        if (email === undefined || email === "") {
            email = cur_user.email;
        } else {
            const user_email = await Users.findOne({where: {email}})
            if (user_email && parseInt(user_email.id) !== parseInt(id)) {
                return next(ApiError.badRequest('Пользователь с таким email или username уже существует'))
            }
        }

        if (!username || username === "" || username ===  "undefined") {
            username = cur_user.username;
        } else {
            const user_username = await Users.findOne({where: {username}})
            if (user_username && parseInt(user_username.id) !== parseInt(id)) {
                return next(ApiError.badRequest('Пользователь с таким email или username уже существует'))
            }
        }

        let hashPassword;
        if (!password || password === "" || password === "undefined") {
            hashPassword = cur_user.password;
        } else {
            hashPassword = await bcrypt.hash(password, 5);
        }

        const user = await (await (Users.findOne(
            {where: {id}},
        ))).update({username: username, email: email, password: hashPassword, avatar: fileName},)
        const token = generateJwt1(id, username, email, fileName)
        return res.json({token, password})
    }

    async delete(req, res) {
        const {id} = req.params
        const user = await Users.destroy(
            {where: {id}},
        )
        return res.json(user)
    }
}

module.exports = new UserController()
