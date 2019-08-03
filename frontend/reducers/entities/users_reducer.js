import { RECEIVE_CURRENT_USER } from "../../actions/session";
import { RECEIVE_USERS, RECEIVE_USER } from "../../actions/users_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.user.id]: action.user })
        case RECEIVE_USERS:
            return Object.assign({},  action.users)
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.id]: action.user })
        default:
            return state
    }
}
