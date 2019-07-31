import { RECEIVE_CURRENT_USER } from "../../actions/session";
import { RECEIVE_EMAIL_FORM_DATA } from "../../actions/ui_actions"


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {}
        case RECEIVE_EMAIL_FORM_DATA:
            return Object.assign({}, action.data)
        default: return state
    }
}