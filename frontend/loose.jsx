import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import {createUser} from './util/users_api_util'
import configureStore from './store/store'
import {checkEmail} from './actions/session'
document.addEventListener('DOMContentLoaded', ()=>{
    let preloadedState = undefined;
    if (window.currentUser) {
        preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: {
                id: window.currentUser.id,
                email: "",
                exists: false
            }
        };
    }
    const store = configureStore(preloadedState)
    //DEBUG//
    window.getState = store.getState
    window.dispatch = store.dispatch
    window.checkEmail = checkEmail
    //END DEBUG//
    const rootEl = document.getElementById('root')
    ReactDOM.render(<Root store={store}/>, rootEl)
})