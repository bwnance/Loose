import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import {createUser} from './util/users_api_util'
import configureStore from './store/store'
document.addEventListener('DOMContentLoaded', ()=>{
    let preloadedState = undefined;
    if (window.currentUser) {
        preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: {
                id: window.currentUser.id
            }
        };
    }
    const store = configureStore(preloadedState)
    //DEBUG//
    window.getState = store.getState
    window.dispatch = store.dispatch
    //END DEBUG//
    const rootEl = document.getElementById('root')
    ReactDOM.render(<Root store={store}/>, rootEl)
})