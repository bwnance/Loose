import * as UiAPIUtil from '../util/ui_api_util'

export const RECEIVE_EMAIL_FORM_DATA = "RECEIVE_EMAIL_FORM_DATA"
export const RECEIVE_UI_ERRORS = "RECEIVE_UI_ERRORS"


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


export const checkEmail = (email) => dispatch => {

    return UiAPIUtil.checkEmail(email)
        .then((data) => dispatch(receiveEmailFormData(data)))
        .fail((errors) => dispatch(uiErrors(errors.responseJSON)))
}