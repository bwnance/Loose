import {combineReducers} from 'redux'
import errors from './errors/errors_reducer'
import session from './session_reducer'
import entities from './entities/entities_reducer'
import ui from './ui/ui_reducer'
export default combineReducers({entities, session, errors, ui})