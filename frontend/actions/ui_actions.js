import * as UiAPIUtil from '../util/ui_api_util'

export const RECEIVE_EMAIL_FORM_DATA = "RECEIVE_EMAIL_FORM_DATA"
export const RECEIVE_UI_ERRORS = "RECEIVE_UI_ERRORS"
export const RECEIVE_CURRENT_CHAT_WINDOW_ID = "RECEIVE_CURRENT_CHAT_WINDOW_ID"
export const SHOW_MENU = "SHOW_MENU"
export const HIDE_MENU = "HIDE_MENU"
export const SHOW_CREATE_CHANNEL_OVERLAY = "SHOW_CREATE_CHANNEL_OVERLAY";
export const SHOW_CHANNELS_OVERLAY = "SHOW_CHANNELS_OVERLAY";
export const SHOW_ADD_USER_TO_CHANNEL_OVERLAY = "SHOW_ADD_USER_TO_CHANNEL_OVERLAY";
export const CLOSE_OVERLAY = "CLOSE_OVERLAY"
export const SHOW_TOPIC_OVERLAY = "SHOW_TOPIC_OVERLAY"
export const SHOW_SETTINGS_OVERLAY = "SHOW_SETTINGS_OVERLAY"
export const SHOW_MESSAGE_SETTINGS_OVERLAY = "SHOW_MESSAGE_SETTINGS_OVERLAY"
const uiErrors = errors => ({
    type: RECEIVE_UI_ERRORS,
    errors
})

const showTopicOverlayAction = () => ({ 
    type: SHOW_TOPIC_OVERLAY
})
const showCreateChannelOverlayAction = () => {
    return {
        type: SHOW_CREATE_CHANNEL_OVERLAY
    }
}
const showChannelsOverlayAction = () => {
    return {
        type: SHOW_CHANNELS_OVERLAY
    }
}
const closeOverlayAction = () => {
    return {
        type: CLOSE_OVERLAY
    }
}
const showSettingsOverlayAction = () => {
    return {
        type: SHOW_SETTINGS_OVERLAY
    }
}
const showAddUserToChannelOverlayAction = () => {
    return {
        type: SHOW_ADD_USER_TO_CHANNEL_OVERLAY
    }
}
const showMessageSettingsOverlayAction = () => {
    return {
        type: SHOW_MESSAGE_SETTINGS_OVERLAY
    }
}
const receiveEmailFormData = (data) => {
    return {
        type: RECEIVE_EMAIL_FORM_DATA,
        data
    }
}
export const changeChatWindowView = (id) => {
    return {
        type: RECEIVE_CURRENT_CHAT_WINDOW_ID,
        id
    }
}
export const showMenu = () => {
    return {
        type: SHOW_MENU,
        
    }
}
export const hideMenu = () => {
    return {
        type: HIDE_MENU,
        
    }
}
export const getDefaultChannel = () => dispatch => {
    return UiAPIUtil.fetchDefaultChannel()
        .then(({id}) => dispatch(changeChatWindowView(id)))
        //.fail((err) => console.log(err))
}
export const checkEmail = (email) => dispatch => {

    return UiAPIUtil.checkEmail(email)
        .then((data) => dispatch(receiveEmailFormData(data)))
        .fail((errors) => dispatch(uiErrors(errors.responseJSON)))
}
export const showCreateChannelOverlay = () => dispatch => {
    return dispatch(showCreateChannelOverlayAction())
}
export const showChannelsOverlay = () => dispatch => {
    return dispatch(showChannelsOverlayAction())
}
export const showAddUserToChannelOverlay = () => dispatch => {
    return dispatch(showAddUserToChannelOverlayAction())
}
export const showTopicOverlay = () => dispatch => {
    return dispatch(showTopicOverlayAction())
}
export const showSettingsOverlay = () => dispatch => {
    return dispatch(showSettingsOverlayAction())
}
export const closeOverlay = () => dispatch => {
    return dispatch(closeOverlayAction())
}
export const showMessageSettingsOverlay = () => dispatch => {
    return dispatch(showMessageSettingsOverlayAction())
}