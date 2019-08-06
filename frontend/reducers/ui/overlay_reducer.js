import { SHOW_CREATE_CHANNEL_OVERLAY, SHOW_CHANNELS_OVERLAY, SHOW_ADD_USER_TO_CHANNEL_OVERLAY, CLOSE_OVERLAY } from "../../actions/ui_actions"


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case SHOW_CREATE_CHANNEL_OVERLAY:
            return Object.assign({}, {overlayType: "OVERLAY_CREATE_CHANNEL"})
        case SHOW_CHANNELS_OVERLAY:
            return Object.assign({}, {overlayType: "OVERLAY_SHOW_CHANNELS"})
        case SHOW_ADD_USER_TO_CHANNEL_OVERLAY:
            return Object.assign({}, {overlayType: "OVERLAY_ADD_USERS_TO_CHANNELS"})
        case CLOSE_OVERLAY:
            return Object.assign({})
        default: return state
    }
}