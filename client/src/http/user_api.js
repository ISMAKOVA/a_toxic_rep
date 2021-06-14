import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (reg_data) => {
    try {
        console.log("registration data: ", reg_data)
        const {data} = await $host.post('api/user/registration', reg_data, {
            headers: {
                'Content-Type': `multipart/form-data;`,
            }
        })
        // localStorage.removeItem('token')
        localStorage.setItem('token', data.token)
        console.log("registration token: ", localStorage.getItem('token'))
        return jwt_decode(data.token)
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const login = async (email, password) => {
    try {
        const {data} = await $host.post('api/user/login', {email, password})
        // localStorage.removeItem('token')

        localStorage.setItem('token', data.token)
        console.log("login token: ", localStorage.getItem('token'))
        console.log("login token decode: ", jwt_decode(localStorage.getItem('token')))
        return jwt_decode(data.token)
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const update = async (data_up) => {
    console.log(data_up)
    const token = localStorage.getItem('token')
    console.log(token)
    const {data} = await $host.put('api/user/', data_up, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return jwt_decode(data.token)
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        // localStorage.removeItem("token")
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (e) {
       return null
    }
}

export const fetchOneUser = async (id) => {
    const {data} = await $host.get('api/user/' + id)
    // localStorage.removeItem("token")
    // localStorage.setItem('token', data.token)
    return data
}

