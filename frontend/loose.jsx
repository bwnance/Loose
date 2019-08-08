import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import {createUser} from './util/users_api_util'
import configureStore from './store/store'
import {checkEmail} from './actions/ui_actions.js'
import {sendMessage} from './util/messages_api_util'
import {createChannel} from './util/channels_api_util'
import { fetchDMs } from './util/dm_api_util'
document.addEventListener('DOMContentLoaded', ()=>{
    let preloadedState = undefined;
    if (window.currentUser) {
        preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: {
                id: window.currentUser.id,
            }
        };
    }
    const store = configureStore(preloadedState)
    //DEBUG//
    window.getState = store.getState
    window.sendMessage = sendMessage
    window.createChannel = createChannel
    window.dispatch = store.dispatch
    window.checkEmail = checkEmail
    window.getDMs = fetchDMs;
    //END DEBUG//
    const rootEl = document.getElementById('root')
    ReactDOM.render(<Root store={store}/>, rootEl)

})