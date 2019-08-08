import * as MessagesApiUtil from '../util/messages_api_util'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS'
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}
export const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    }
}
export const receiveMessageErrors = (errors) => {
    return {
        type: RECEIVE_MESSAGE_ERRORS,
        errors
    }
}
const deleteMessageAction = id => {
    return { 
        type: DELETE_MESSAGE,
        id
    }
}
export const fetchMessages = (messageableId, messageableType) => dispatch => {
    // debugger
    const promise = messageableType === "Channel" ? 
        MessagesApiUtil.fetchMessagesFromChannel(messageableId)
        : MessagesApiUtil.fetchMessagesFromDM(messageableId);

        return promise.then((messages) => dispatch(receiveMessages(messages)))
        .fail((errors) => dispatch(receiveMessageErrors(errors)))
}
export const sendMessage = (message) => dispatch => {
    return MessagesApiUtil.sendMessage(message)
        .then((message) => dispatch(receiveMessage(message)))
}
export const deleteMessage = id => dispatch => {
    dispatch(deleteMessageAction(id))
}