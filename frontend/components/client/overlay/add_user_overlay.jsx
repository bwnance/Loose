import React from 'react'
import { connect } from 'react-redux'
import { createChannel, addUsersToChannel } from '../../../actions/channel_actions'
class CreateChannelOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: "", purpose: "", searchUser: "", selectedUsers: [], foundUsers: [] }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSearchBarInput = this.handleSearchBarInput.bind(this)
        this.selectUser = this.selectUser.bind(this)
        this.closeOverlay = this.closeOverlay.bind(this)
        this.handleSearchBarInput = this.handleSearchBarInput.bind(this)
        this.keyUp = this.keyUp.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    render(){
        return (
            
        )
    }
}