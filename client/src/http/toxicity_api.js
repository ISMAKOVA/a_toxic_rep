import {$host} from "./index";

export const createToxicityValue = async (toxic_value, is_rude, is_negative, contains_NER, userVkId, groupVkId, postVkId, commentsVkId) => {
    const {data} = await $host.post('api/toxicityTypes/', {
        toxic_value,
        is_rude,
        is_negative,
        contains_NER,
        userVkId,
        groupVkId,
        postVkId,
        commentsVkId
    })
    return data
}
export const getOneToxicityByPostId = async (post_id, group_id) => {
    const {data} = await $host.get('api/toxicityTypes/' + post_id +'/'+group_id+'/byPostId')
    return data
}
export const getAllToxicityByGroupId = async (group_id) => {
    const {data} = await $host.get('api/toxicityTypes/' + +group_id+'/byGroupId')
    return data
}
