import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchOnePost = async (id) => {
    const {data} = await $host.get('api/postVK/' + id)
    return data
}

export const fetchAllPosts = async () => {
    const {data} = await $host.get('api/postVK/')
    return data
}

export const fetchAllGroupPosts = async (id) => {
    const {data} = await $host.get('api/postVK/' + id+'/byGroup')
    return data
}

export const createPostVK = async (id, author_type, text, date, userVkId, groupVkId, picture) => {
    const {data} = await $host.post('api/postVK/', {id, author_type, text, date, userVkId, groupVkId, picture})
    return data
}

// export const addFavoriteGroup = async () => {
//     const {data} = await $host.post('api/favoriteGroups/create')
//     return data
// }

export const fetchPostsFromVK = async (id) => {
    const {data} = await $host.get('api/postVK/' + id + '/fromVK')
    return data
}
