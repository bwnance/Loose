import React from 'react'
import { connect } from 'react-redux'
import { createChannel, addUsersToChannel } from '../../../actions/channel_actions'
import CloseOverlayBtn from './common/close_overlay_btn'
import SearchUsersField from './common/search_users_field'
class AddUserOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { searchUser: "", selectedUsers: [], foundUsers: [] }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setStateFromChild = this.setStateFromChild.bind(this)
        this.handleInput = this.handleInput.bind(this)
        
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.selectedUsers)
        this.props.addUsersToChannel(this.state.selectedUsers, this.props.currentChannel.id);
        
        this.resetState()
        this.props.closeOverlay();
        
    }       
    handleInput(type) {
        return (e) => {
            // console.log(e.target.value)
            this.setState({ [type]: e.target.value })
        }
    }
    setStateFromChild(state) {
        console.log(state)
        this.setState(state)
    }
    resetState() {
        this.setState({ searchUser: "", foundUsers: [], selectedUsers: [] })
    }
    render(){
        return (
            <div className="client-overlay add-users-overlay">
                <CloseOverlayBtn />
                <div className="add-users-overlay-content">
                <h2>
                    Add people to # {this.props.currentChannel.title}
                </h2>
                    <form className="overlay-form add-users-form" onSubmit={this.handleSubmit}>
                        <SearchUsersField exclusionList={this.props.currentChannel.user_ids} setParentState={this.setStateFromChild} handleInput={this.handleInput}/>
                        <input className="overlay-submit" type="submit" value="Add"/>
                    </form>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentChannel: state.entities.channels[state.ui.chatWindow.id]
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(AddUserOverlay)