import React from 'react'
import Splash from './splash/splash'
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import {Route} from 'react-router-dom'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import Client from './client/client'

export default ({state}) => { 
    App.cable = ActionCable.createConsumer("/cable")
    return (<div className="main-container">
        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <ProtectedRoute path="/client" component={Client} />

       

        
    </div>)
}
