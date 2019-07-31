import { CLEAR_ALL_ERRORS } from '../../actions/errors_actions'
import {RECEIVE_UI_ERRORS} from '../../actions/ui_actions'
import { RECEIVE_CURRENT_USER } from '../../actions/session'
const _noErrors = []
export default (state = _noErrors, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return _noErrors
        case RECEIVE_UI_ERRORS:
            return Object.assign({}, action.errors.errors)
        case CLEAR_ALL_ERRORS:
            return _noErrors
        default:
            return state
    }
}
