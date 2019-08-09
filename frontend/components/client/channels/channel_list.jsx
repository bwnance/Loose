import React from 'react';
import {connect} from 'react-redux'
import {fetchChannels, fetchAllChannels} from '../../../actions/channel_actions'
import {showChannelsOverlay, showCreateChannelOverlay, showDMsOverlay} from '../../../actions/ui_actions'
import { logout } from '../../../actions/session'
import {fetchDMs} from '../../../actions/dm_actions'
import {XCircle, PlusCircle} from 'react-feather'
class ChannelList extends React.Component {
    constructor(props){ 
        super(props)
        this.showCreateChannel = this.showCreateChannel.bind(this);
        this.showChannelsOverlay = this.showChannelsOverlay.bind(this)
        this.showDmOverlay = this.showDmOverlay.bind(this)
        this.hideDM = this.hideDM.bind(this)
        this.timeout = undefined;
    }
    componentWillUnmount(){
        if (this.timeout) clearTimeout(this.timeout)

    }
    componentDidMount() {
        this.props.fetchAllChannels();//.then(() => console.log("default channel fetched "));
        this.props.fetchDMs();
    }
    showCreateChannel(e){
        e.preventDefault();
        this.props.showCreateChannelOverlay();
    }

    showChannelsOverlay(){
        //should fetch channels with permissions
        this.props.showChannelsOverlay()
    }
    showDmOverlay(){
        //should fetch channels with permissions
        this.props.showDMsOverlay()
    }
    hideDM(id){
        return (e)=>{
            e.preventDefault();
            e.stopPropagation();
            // debugger
            this.props.hideDM(id);
            // clearTimeout(this.timeout)
        }
    }
    render(){
        const channels = this.props.channels.map((channel) => (
            <li id={`channel-${channel.id}`} className={`channel-list-item  ${channel.id === this.props.currentChannel ? " selected-channel" : ""}`} key={`channel-${channel.id}`}>
                <button className="channel-list-item-button" onClick={this.props.changeChannelView(channel.id, channel.messageable_type)} >{`# ${channel.title}`}</button>
            </li>)) // sort alphabetically later
        const dms = this.props.dms.map((dm) => dm.hidden ? null : (
            <li id={`channel-${dm.id}`} className={`channel-list-item  ${dm.id === this.props.currentChannel ? " selected-channel" : ""}`} key={`channel-${dm.id}`}>
                
                <button className="channel-list-item-button" onClick={()=> this.timeout = setTimeout(this.props.changeChannelView(dm.id, dm.messageable_type),50)} ><span><i className="user-active fa fa-circle" />{`${dm.title}`}</span> <XCircle onClick={this.hideDM(dm.id)} className="x"/></button>
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
                                    {/* <i className="fa fa-plus-circle"/> */}
                                    <PlusCircle className="plus"/>
                            </button>
                        </div>
                    </li>
                    {channels}
                    <li >
                        <div className="channels-header channel-list-item">
                            <div className="channel-list-item-button" onClick={this.showChannelsOverlay}><span>+&nbsp;&nbsp;Add a Channel</span></div>
                            
                        </div>
                    </li>
                    <li>
                        <div className="dm-header channel-list-item">
                            <span onClick={this.showDmOverlay}>Direct Messages</span>
                                <button className="show-create-dm-button" onClick={this.showDmOverlay}>
                                {/* <i className="fa fa-plus-circle" /> */}
                                    <PlusCircle className="plus" />
                            </button>
                        </div>
                    </li>
                    {dms}
                </ul>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels).filter(channel => channel.user_ids.includes(state.session.id)),
    currentChannel: state.ui.chatWindow.id,
    dms: Object.values(state.entities.dms)
})
const mapDispatchToProps = (dispatch) => ({
    fetchChannels: () => dispatch(fetchChannels()),
    fetchAllChannels : () => dispatch(fetchAllChannels()),
    fetchDMs: ()=> dispatch(fetchDMs()),
    logout: () => dispatch(logout()),
    showCreateChannelOverlay: () => dispatch(showCreateChannelOverlay()),
    showChannelsOverlay: () => dispatch(showChannelsOverlay()),
    showDMsOverlay: () => dispatch(showDMsOverlay()),

})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);