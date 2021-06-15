import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchOneUser = async (id) => {
    const {data} = await $host.get('api/userVK/' + id)
    return data
}

export const fetchAllUsers = async () => {
    const {data} = await $host.get('api/userVK/')
    return data
}

export const fetchAllUserUsers = async (id) => {
    const {data} = await $host.get('api/userVK/' + id+'/byUser')
    return data
}

export const createUserVK = async (id, username, privacy, avatar, userId) => {
    const {data} = await $host.post('api/userVK/', {id, username, privacy, userId, avatar})
    return data
}

// export const addFavoriteGroup = async () => {
//     const {data} = await $host.post('api/favoriteGroups/create')
//     return data
// }

export const fetchOneUserFromVK = async (id) => {
    const {data} = await $host.get('api/userVK/' + id + '/fromVK')
    return data
}
