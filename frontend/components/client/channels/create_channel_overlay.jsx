import React from 'react'
import {connect} from 'react-redux'
import { createChannel, addUsersToChannel} from '../../../actions/channel_actions'
class CreateChannelOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: "", purpose: "", search_user: "", selectedUsers: [], foundUsers: []}
        this.onSubmit = this.onSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSearchBarInput = this.handleSearchBarInput.bind(this)
        this.selectUser = this.selectUser.bind(this)
    }
    onSubmit(e) {
        e.preventDefault()
        const that = this
        if(this.state.title.length <= 20){
            this.props.createChannel(this.state).then((result) => {
                this.props.addUsersToChannel(this.state.selectedUsers.concat(this.props.currentUserId), result.channel.id)
                this.props.closeOverlay()
                this.setState({ title: "", purpose: "" })
            })
        }
    }
    handleSearchBarInput(e){
        this.handleInput("search_user")(e);
        const searchText = e.target.value
        let foundUsers = [];
        Object.values(this.props.users).forEach(user => {
            if (searchText !== "" && user.id !== this.props.currentUserId && user.username.startsWith(searchText)){
                foundUsers.push(user)
            }
        })
        console.log(foundUsers)
        this.setState({foundUsers: foundUsers})
    }
    selectUser(id){
        return ()=> {
            this.setState({selectedUsers: this.state.selectedUsers.concat(id)})
        }
    }
    handleInput(type){
        return (e) => {
           // console.log(e.target.value)
            this.setState({ [type]: e.target.value })
        }
    }
    removeSelectedUser(id){
        return () => {
            this.setState(
                {selectedUsers: this.state.selectedUsers.filter(checkId =>{
                    return id !== checkId
                })
            })
        }
    }
    render() {
        const foundUserButtons = this.state.foundUsers.map((user) => {
            return (
            <button onClick={this.selectUser(user.id)}key={`found-user-${user.id}`} className="found_user_item">
                {this.state.selectedUsers.includes(user.id) ? <i className="user-already-selected fa fa-check"/> : ""}
                {user.username}
            </button>
            )
        })
        const selectedUserSpans = this.state.selectedUsers.map( id =>{
            return <span key={`selected-user-${id}`} className="selected-user-span">
                <i className="fa fa-user"/>
                {this.props.users[id].username}
                <button className="remove-selected-user" onClick={this.removeSelectedUser(id)}>x</button>
            </span>
        })
        return (
            
            <div className={`client-overlay ${this.props.className}`}>
                <button onClick={this.props.closeOverlay} className="close-overlay-button">
                    <div className="overlay-close-x">x</div>
                    <div className="overlay-close-esc">esc</div>
                </button>
                <form className="overlay-form" onSubmit={this.onSubmit}>
                    <label htmlFor="channel-name">Name</label>
                    <input id="channel-name" className="loose-text-input overlay-text-input" type="text" value={this.state.title} onChange={this.handleInput('title')}/>
                    <label htmlFor="channel-purpose"><span>Channel Purpose <span className="overlay-optional">(optional)</span></span></label>
                    <input id="channel-purpose" className="loose-text-input overlay-text-input" type="text" value={this.state.purpose} onChange={this.handleInput('purpose')}/>
                    <label htmlFor="channel-members"><span>Send invites to  <span className="overlay-optional">(optional)</span></span></label>
                    {selectedUserSpans}<input id="channel-members" className="loose-text-input overlay-text-input" type="text" value={this.state.search_user} onChange={this.handleSearchBarInput}/>
                    <div className="overlay-buttons">
                        <button onClick={this.props.closeOverlay} className="overlay-cancel" >Cancel</button>
                        <input type="submit" className="overlay-submit" value="Create" />
                    </div>
                   
                </form>
                <div className="foundUsers-dropdown">
                    {foundUserButtons}
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
    createChannel: (channel) => dispatch(createChannel(channel)),
    addUsersToChannel: (users, channelId) => dispatch(addUsersToChannel(users, channelId))
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelOverlay);