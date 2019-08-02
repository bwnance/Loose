import React from 'react'
import EmailForm from './email_form/email_form'
import NavBar from '../navbar/navbar'

export default () => { 
    return (
        <>
        <NavBar/>
        <section className="splash">
            <h1 className="splash-logo">
                Hang Tight. <br/>Keep it Loose.
            </h1>
            <EmailForm/>
        </section>
        </>
    )
}