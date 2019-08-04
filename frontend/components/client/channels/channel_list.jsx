import React from 'react';
import {connect} from 'react-redux'
import {fetchChannels} from '../../../actions/channel_actions'
import CreateChannelOverlay from './create_channel_overlay'
import {changeChatWindowView} from '../../../actions/ui_actions'
import { logout } from '../../../actions/session'

class ChannelList extends React.Component {
    constructor(props){ 
        super(props)
        this.showCreateChannel = this.showCreateChannel.bind(this);
        this.showOverlay = this.showOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.handleChannelClick = this.handleChannelClick.bind(this);
        this.state = {showOverlay: false}
    }
    componentDidMount() {
        this.props.fetchChannels();//.then(() => console.log("default channel fetched "));
        
    }
    showCreateChannel(e){
        e.preventDefault();
        this.showOverlay();
    }
    handleChannelClick(id){
        return () => this.props.changeChannelView(id)
    }
    showOverlay(){
        this.setState({ showOverlay: true });

    }
    closeOverlay(){
        this.setState({ showOverlay: false });
    }
    render(){
        const channels = this.props.channels.map((channel) => (
            <li className="channel-list-item" key={`channel-${channel.id}`}>
                <button className="channel-list-item-button" onClick={this.handleChannelClick(channel.id)} >#  {channel.title}</button>
                {/* <div>{channel.purpose}</div> */}
            </li>))
        return (
            
            <>

            <ul className="channel-list">
                    <button className="loose-button logout-button" onClick={this.props.logout}>Log out</button>

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
                <CreateChannelOverlay closeOverlay={this.closeOverlay} className={this.state.showOverlay ? "" : " transparent"}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels)
})
const mapDispatchToProps = (dispatch) => ({
    fetchChannels: () => dispatch(fetchChannels()),
    changeChannelView: (id) => dispatch(changeChatWindowView(id)),
    logout: () => dispatch(logout())

})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);