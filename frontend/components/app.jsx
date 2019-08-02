import React from 'react'
import Splash from './splash/splash'
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import {Route} from 'react-router-dom'
import LoginFormContainer from './session/login_form_container'
import NavBar from './navbar/navbar'
import SignupFormContainer from './session/signup_form_container'
import ClientContainer from './client/client_container'
import Client from './client/client'

export default ({state}) => { 
    const navBar = state.session.id ? null : <NavBar />
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable")
    return (<div className="main-container">
        {/* {navBar} */}
        <NavBar />
        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <ProtectedRoute path="/client" component={ClientContainer} />

       

        
    </div>)
}
