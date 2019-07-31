import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session";

const _nullUser = {
    id: null,
}

export default (state = _nullUser, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
        
            return Object.assign({}, { id: action.user.id, email: action.user.email, exists: action.user.exists })
        case LOGOUT_CURRENT_USER:
            return _nullUser
        default:
            return state
    }
}