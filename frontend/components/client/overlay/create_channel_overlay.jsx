import React from 'react'
import {connect} from 'react-redux'
import { closeOverlay } from '../../../actions/ui_actions'
import { createChannel, addUsersToChannel} from '../../../actions/channel_actions'
import CloseOverlayBtn from './common/close_overlay_btn'
import SearchUsersField from './common/search_users_field'
class CreateChannelOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: "", purpose: "", searchUser: "", selectedUsers: [], foundUsers: []}
        this.onSubmit = this.onSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.setStateFromChild = this.setStateFromChild.bind(this)
    }
    onSubmit(e) {
        e.preventDefault()
        const that = this
        if(this.state.title.length <= 22){
            this.props.createChannel(this.state);
            this.resetState()
        }
    }
    resetState(){
        this.setState({ title: "", purpose: "", searchUser: "", foundUsers: [], selectedUsers: [] })
    }
    setStateFromChild(state){
        this.setState(state);
    }
    handleInput(type){
        return (e) => {
           // console.log(e.target.value)
            this.setState({ [type]: e.target.value })
        }
    }
    render() {
        


        return (
            
            <div className="client-overlay">
                <CloseOverlayBtn/>
                <div className="overlay-content">
                <h1>
                    Create a Channel
                </h1>
                    <p>
                        Channels are where your members communicate. They’re best when organized around a topic — #marketing, for example.
                    </p>
                    <form className="overlay-form" onSubmit={this.onSubmit}>
                        <label htmlFor="channel-name">Name</label>
                        <input id="channel-name" className="loose-text-input overlay-text-input" type="text" value={this.state.title} onChange={this.handleInput('title')} placeholder="e.g. marketing"/>
                        <p className="subtitle">Names must be shorter than 22 characters.</p>
                        <label htmlFor="channel-purpose"><span>Channel Purpose <span className="overlay-optional">(optional)</span></span></label>
                        <input id="channel-purpose" className="loose-text-input overlay-text-input" type="text" value={this.state.purpose} onChange={this.handleInput('purpose')}/>
                        <p className="subtitle">What's this channel about?</p>

                        <label htmlFor="channel-members"><span>Send invites to  <span className="overlay-optional">(optional)</span></span></label>
                       
                        <SearchUsersField setParentState={this.setStateFromChild} handleInput={this.handleInput} />
                        <p className="subtitle">Select users to add to this channel</p>

                        <div className="overlay-buttons">
                            <button type="button" onClick={this.props.closeOverlay} className="overlay-cancel" >Cancel</button>
                            <input type="submit" className="overlay-submit" value="Create" />
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    users: state.entities.users,
    currentUserId: state.session.id
})
const mapDispatchToProps = (dispatch) => ({
    closeOverlay: () => dispatch(closeOverlay())
    // createChannel: (channel) => dispatch(createChannel(channel)),
    // addUsersToChannel: (users, channelId) => dispatch(addUsersToChannel(users, channelId))
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelOverlay);