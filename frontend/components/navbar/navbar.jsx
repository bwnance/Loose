import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/session'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return this.props.currentUser ? (
            <div>
                <button onClick={this.props.logout}>Log out</button>
            </div>
        ) : (
            <div>
                <Link to="/signup">Log up</Link>
                <Link to="/login">Log in</Link>
            </div>
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