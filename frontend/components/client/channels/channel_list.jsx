import React from 'react';
import {connect} from 'react-redux'
import {fetchChannels} from '../../../actions/channel_actions'
import {changeChatWindowView} from '../../../actions/ui_actions'
import { logout } from '../../../actions/session'

class ChannelList extends React.Component {
    constructor(props){ 
        super(props)
        this.showCreateChannel = this.showCreateChannel.bind(this);
        this.state = {showOverlay: false}
    }
    componentDidMount() {
        this.props.fetchChannels();//.then(() => console.log("default channel fetched "));
        
    }
    showCreateChannel(e){
        e.preventDefault();
        this.props.showOverlay();
    }


    render(){
        const channels = this.props.channels.map((channel) => (
            <li id={`channel-${channel.id}`} className={`channel-list-item  ${channel.id === this.props.currentChannel ? " selected-channel" : ""}`} key={`channel-${channel.id}`}>
                <button className="channel-list-item-button" onClick={this.props.changeChannelView(channel.id)} >#  {channel.title}</button>
            </li>)) // sort alphabetically later
        return (
            <>
            
               
                <div className="channel-list">
                <div className="channel-list-jump-to">
                    
                </div>
                <ul className="channel-list-scrollable">
                    <li>
                        <div className="channels-header channel-list-item">
                            <span>Channels</span>
                            <button className="show-create-channel-button" onClick={this.showCreateChannel}>
                                    <i className="fa fa-plus-circle"/>

                            </button>
                        </div>
                    </li>
                    {channels}
                </ul>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels),
    currentChannel: state.ui.chatWindow.id
})
const mapDispatchToProps = (dispatch) => ({
    fetchChannels: () => dispatch(fetchChannels()),
    logout: () => dispatch(logout())

})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);