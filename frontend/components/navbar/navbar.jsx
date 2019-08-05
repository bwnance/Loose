import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
class NavBar extends React.Component {
    render() {
        return (
            <div className={`navbar ${this.props.className}`}>
                    <>
                    <div className="logo-container">
                        <div className="logo"/>
                        <span className="loose-text">Loose</span>
                    </div>
                    
                        <div className="links">
                            <Link className="navbar-login"  to="/login">Log in</Link>
                            <Link className="navbar-signup" to="/signup">Get Started</Link>
                        </div>

                    </>
                
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        currentUser: state.entities.users[state.session.id]
    }
}
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)