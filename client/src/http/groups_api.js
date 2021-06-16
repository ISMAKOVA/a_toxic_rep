import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchOneGroup = async (id) => {
    const {data} = await $host.get('api/groupVK/' + id)
    return data
}

export const fetchOneGroupByScreenName = async (id) => {
    const {data} = await $host.get('api/groupVK/' + id+'/byScreenName')
    return data
}

export const fetchAllGroups = async () => {
    const {data} = await $host.get('api/groupVK/')
    return data
}

export const fetchAllUserGroups = async (id) => {
    const {data} = await $host.get('api/groupVK/' + id+'/byUser')
    return data
}

export const createGroupVK = async (id, info, privacy, screen_name, avatar, userId) => {
    const {data} = await $host.post('api/groupVK/', {id, info, privacy,screen_name, avatar, userId})
    return data
}

// export const addFavoriteGroup = async () => {
//     const {data} = await $host.post('api/favoriteGroups/create')
//     return data
// }

export const fetchOneGroupFromVK = async (id) => {
    const {data} = await $host.get('api/groupVK/' + id + '/fromVK')
    return data
}
