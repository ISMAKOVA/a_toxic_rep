import {$host} from "./index";



export const fetchOneComment = async (id) => {
    const {data} = await $host.get('api/commentsVK/' + id)
    return data
}

export const fetchAllPosts = async () => {
    const {data} = await $host.get('api/commentsVK/')
    return data
}


export const createPostVK = async (id, author_type, text, userVkId, groupVkId, postVkId) => {
    const {data} = await $host.post('api/commentsVK/', {id, author_type, text, userVkId, groupVkId, postVkId})
    return data
}

export const fetchCommentsFromVK = async (group_screen_name, post_id) => {
    const {data} = await $host.get('api/commentsVK/' + group_screen_name+'/'+post_id + '/fromVK')
    return data
}
