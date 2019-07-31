import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER } from "../../actions/session";

const _noErrors = []
export default (state = _noErrors, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return _noErrors
        case RECEIVE_SESSION_ERRORS:
            return Object.assign({}, action.errors['errors'])
        default:
            return state
    }
}
