import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import {createUser} from './util/users_api_util'
document.addEventListener('DOMContentLoaded',()=>{
    window.createUser = createUser
    
    const rootEl = document.getElementById('root')
    ReactDOM.render(<Root/>, rootEl)
})