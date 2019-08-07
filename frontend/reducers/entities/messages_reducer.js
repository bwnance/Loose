import { RECEIVE_MESSAGE, RECEIVE_MESSAGES, DELETE_MESSAGE } from "../../actions/messages_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return Object.assign({}, action.messages)
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, { [action.message.id]: action.message })
        case DELETE_MESSAGE:
            const tempState = Object.assign({}, state)
            delete tempState[action.id]
            return Object.assign({}, tempState)
        default:
            return state
    }
}
