import { RECEIVE_CURRENT_USER } from "../../actions/session";
import { RECEIVE_USERS } from "../../actions/users_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.user.id]: action.user })
        case RECEIVE_USERS:
            return Object.assign({},  action.users)
        default:
            return state
    }
}
