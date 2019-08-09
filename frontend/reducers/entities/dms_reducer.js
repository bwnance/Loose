import { RECEIVE_DMS, RECEIVE_DM } from "../../actions/dm_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_DMS:
            return Object.assign({}, action.dms)
        case RECEIVE_DM:
            return Object.assign({}, state, { [action.dm.id]: action.dm })
        default:
            return state
    }
}
