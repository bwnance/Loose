import { RECEIVE_CURRENT_CHAT_WINDOW_ID } from "../../actions/ui_actions";

export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_CHAT_WINDOW_ID:
            return Object.assign({},{ id: action.id})
        default: return state
    }
}