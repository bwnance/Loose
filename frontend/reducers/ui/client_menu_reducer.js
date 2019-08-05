import { SHOW_MENU, HIDE_MENU } from "../../actions/ui_actions";

export default (state = {showMenu: false}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case SHOW_MENU:
            return Object.assign({},{ showMenu: true})
        case HIDE_MENU:
            return Object.assign({},{ showMenu: false})
        default: return state
    }
}