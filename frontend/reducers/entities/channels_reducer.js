import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, DELETE_CHANNEL } from "../../actions/channel_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CHANNELS:
            // debugger
            return Object.assign({}, action.channels )
        case RECEIVE_CHANNEL:
            return Object.assign({}, state, {[action.channel.id]: action.channel} )
        case DELETE_CHANNEL:
            const temp = Object.assign({}, state)
            delete temp[action.channelId]
            return Object.assign({}, temp)
        default:
            return state
    }
}
