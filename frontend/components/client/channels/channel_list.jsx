import React from 'react';
import {connect} from 'react-redux'
import {fetchChannels, fetchAllChannels} from '../../../actions/channel_actions'
import {showCreateChannelOverlay} from '../../../actions/ui_actions'
import { logout } from '../../../actions/session'
import {showChannelsOverlay} from '../../../actions/ui_actions'

class ChannelList extends React.Component {
    constructor(props){ 
        super(props)
        this.showCreateChannel = this.showCreateChannel.bind(this);
        this.showChannelsOverlay = this.showChannelsOverlay.bind(this)
    }
    componentDidMount() {
        this.props.fetchAllChannels();//.then(() => console.log("default channel fetched "));
        
    }
    showCreateChannel(e){
        e.preventDefault();
        this.props.showCreateChannelOverlay();
    }

    showChannelsOverlay(){
        //should fetch channels with permissions
        this.props.showChannelsOverlay()
    }
    render(){
        const channels = this.props.channels.map((channel) => (
            <li id={`channel-${channel.id}`} className={`channel-list-item  ${channel.id === this.props.currentChannel ? " selected-channel" : ""}`} key={`channel-${channel.id}`}>
                <button className="channel-list-item-button" onClick={this.props.changeChannelView(channel.id)} >{`# ${channel.title}`}</button>
            </li>)) // sort alphabetically later
        return (
            <>
                <div className="channel-list">
                <div className="channel-list-jump-to">
                    
                </div>
                <ul className="channel-list-scrollable">
                    <li>
                        <div className="channels-header channel-list-item">
                            <span onClick={this.showChannelsOverlay}>Channels</span>
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
    channels: Object.values(state.entities.channels).filter(channel => channel.user_ids.includes(state.session.id)),
    currentChannel: state.ui.chatWindow.id
})
const mapDispatchToProps = (dispatch) => ({
    fetchChannels: () => dispatch(fetchChannels()),
    fetchAllChannels : () => dispatch(fetchAllChannels()),
    logout: () => dispatch(logout()),
    showCreateChannelOverlay: () => dispatch(showCreateChannelOverlay()),
    showChannelsOverlay: () => dispatch(showChannelsOverlay())

})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);