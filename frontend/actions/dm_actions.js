import * as DMApiUtil from '../util/dm_api_util'



export const RECEIVE_DMS = "RECEIVE_DMS"
export const RECEIVE_DM = "RECEIVE_DM"

export const receiveDM = (dms) => {
    return {
        type: RECEIVE_DM,
        dms
    }
}
export const receiveDMs = (dms) => {
    return {
        type: RECEIVE_DMS,
        dms
    }
}
export const fetchDMs = () => dispatch => {
    return DMApiUtil.fetchDMs()
        .then((dms) => dispatch(receiveDMs(dms)))
        // .fail((errors) => dispatch(receiveChannelErrors(errors)))
}