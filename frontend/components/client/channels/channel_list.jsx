import React from 'react';
import {connect} from 'react-redux'
import {fetchChannels} from '../../../actions/channel_actions'
import CreateChannelOverlay from './create_channel_overlay'
class ChannelList extends React.Component {
    constructor(props){ 
        super(props)
        this.showCreateChannel = this.showCreateChannel.bind(this)
        this.showOverlay = this.showOverlay.bind(this)
        this.closeOverlay = this.closeOverlay.bind(this)
        this.state = {showOverlay: false}
    }
    componentDidMount() {
        this.props.fetchChannels();
    }
    showCreateChannel(e){
        e.preventDefault();
        this.showOverlay();
    }
    showOverlay(){
        this.setState({ showOverlay: true });

    }
    closeOverlay(){
        this.setState({ showOverlay: false });
    }
    render(){
        const channels = this.props.channels.map((channel) => (
                                                                <li key={`channel-${channel.id}`}>
                                                                    <div>{channel.title}</div>
                                                                    <div>{channel.purpose}</div>
                                                                </li>))
        return (
            <>
            <ul>{channels}</ul>
            <button className="show-create-channel-button" onClick={this.showCreateChannel}/>
            <CreateChannelOverlay closeOverlay={this.closeOverlay}className={this.state.showOverlay ? "client-overlay" : "hide"}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels)
})
const mapDispatchToProps = (dispatch) => ({
    fetchChannels: () => dispatch(fetchChannels())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);