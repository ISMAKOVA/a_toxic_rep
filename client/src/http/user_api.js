import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (reg_data) => {
    const {data} = await $host.post('api/user/registration', reg_data, {headers: {
            'Content-Type': `multipart/form-data;`,
        }})
    localStorage.removeItem('token')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.removeItem('token')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const update = async (data_up) =>{
    console.log(data_up)
    const token = localStorage.getItem('token')
    console.log(token)
    const {data} = await $host.put('api/user/', data_up, {headers: {
            'Authorization': `Bearer ${token}`
        }})
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.removeItem("token")
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchOneUser = async (id) =>{
    const {data} = await $host.get('api/user/'+id)
    return data
}

