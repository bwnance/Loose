import * as UiAPIUtil from '../util/ui_api_util'

export const RECEIVE_EMAIL_FORM_DATA = "RECEIVE_EMAIL_FORM_DATA"
export const RECEIVE_UI_ERRORS = "RECEIVE_UI_ERRORS"
export const RECEIVE_CURRENT_CHAT_WINDOW_ID = "RECEIVE_CURRENT_CHAT_WINDOW_ID"
const uiErrors = errors => ({
    type: RECEIVE_UI_ERRORS,
    errors
})

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