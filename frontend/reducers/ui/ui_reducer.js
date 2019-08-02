import {combineReducers} from 'redux'
import emailForm from './email_form_reducer'
import chatWindow from './chat_window_reducer'

export default combineReducers({emailForm, chatWindow})

