import {$host} from "./index";



export const fetchOneComment = async (id) => {
    const {data} = await $host.get('api/commentsVK/' + id)
    return data
}

export const fetchAllComments = async () => {
    const {data} = await $host.get('api/commentsVK/')
    return data
}
export const fetchAllCommentsByGroupId = async (id) => {
    const {data} = await $host.get('api/commentsVK/'+id+'/byGroupId')
    return data
}


export const createCommentVK = async (id, date,author_type, text, picture, userVkId, groupVkId, postVkId) => {
    const {data} = await $host.post('api/commentsVK/', {id,date, author_type, text, picture, userVkId, groupVkId, postVkId})
    return data
}

export const fetchCommentsFromVK = async (group_screen_name, post_id) => {
    const {data} = await $host.get('api/commentsVK/' + group_screen_name+'/'+post_id + '/fromVK')
    return data
}
