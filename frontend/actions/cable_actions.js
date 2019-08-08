import * as CableUtil from '../util/cable_util'
export const deleteMessage = (message) => dispatch => {
    CableUtil.deleteMessage(message)
}
export const updateMessage = (message_id, message) => dispatch => {
    CableUtil.updateMessage(message_id, message)
}
export const updateChannel = (channelId, channel, type="") => dispatch => {
    // debugger
    CableUtil.updateChannel(channelId, channel, type)
}