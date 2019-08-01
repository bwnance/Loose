import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/session'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                {this.props.currentUser && this.props.currentUser.id ? 
                        <button className="loose-button logout-button" onClick={this.props.logout}>Log out</button>
                 : 
                    <>
                        <Link className="navbar-login"  to="/login">Log in</Link>
                        <Link className="navbar-signup" to="/signup">Get Started</Link>

                    </>
                }
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
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)