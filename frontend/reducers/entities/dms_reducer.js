import { RECEIVE_DMS } from "../../actions/dm_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_DMS:
            // debugger
            return Object.assign({}, action.dms)
        default:
            return state
    }
}
