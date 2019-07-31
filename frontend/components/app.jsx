import React from 'react'
import Splash from './splash/splash'
import NavBar from './navbar/navbar'
import {AuthRoute} from '../util/route_util'
import {Route} from 'react-router-dom'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
export default () => { 
    return (<div>
        <Splash/>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
    </div>)
}
