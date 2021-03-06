import React from 'react'
import {connect} from 'react-redux'
import Channel from './channels/channel'
import ChannelList from './channels/channel_list'
import ChatWindow from './chat/chat_window'
import {getAllUsers, receiveUser} from '../../actions/users_actions'
import {deleteMessage} from '../../actions/messages_actions'
import { getDefaultChannel, changeChatWindowView, hideMenu, closeOverlay} from '../../actions/ui_actions'
import CreateChannelOverlay from './overlay/create_channel_overlay'
import ShowChannelsOverlay from './overlay/show_channels_overlay'
import ClientNavBar from './client_navbar'
import { logout } from '../../actions/session'
import { receiveChannel, receiveChannels, addUserToChannel, deleteChannel} from '../../actions/channel_actions'
import ShowTopicOverlay from './overlay/show_topic_overlay'
import AddUserOverlay from './overlay/add_user_overlay'
import ShowSettingsOverlay from './overlay/settings_overlay'
import {receiveDMs, receiveDM} from '../../actions/dm_actions'
import DMOverlay from './overlay/dm_overlay'
class Client extends React.Component {
    constructor(props) {
        super(props)
        this.onReceiveMessage = this.onReceiveMessage.bind(this)
        this.state = {messages: [], showOverlay: false}
        this.closeOverlay = this.closeOverlay.bind(this);
        this.showOverlay = this.showOverlay.bind(this)
        this.changeChannelView = this.changeChannelView.bind(this)
        this.hideMenu = this.hideMenu.bind(this)
        this.logout = this.logout.bind(this)
        this.receiveClientData = this.receiveClientData.bind(this)
        this.addUsersToChannel = this.addUsersToChannel.bind(this)
        this.addUserToChannel = this.addUserToChannel.bind(this)
        this.deleteChannel = this.deleteChannel.bind(this)
        // this.onConnected = this.onConnected.bind(this)
        this.onDisconnect = this.onDisconnect.bind(this)
        this.addUsersToDM = this.addUsersToDM.bind(this)
        this.hideDM = this.hideDM.bind(this)
        this.showDM = this.showDM.bind(this)
    }
    showOverlay() {
        this.setState({ showOverlay: true });
    }
    closeOverlay() {
        this.props.closeOverlay();
    }
    componentWillUnmount() {
        App.cable.disconnect();
    }
    onReceiveMessage(message){
        ////console.log(message); 
        this.setState({messages: this.state.messages.concat(message.body)})
    }
    changeChannelView(id, type) {
        
        return (makeRequest=true && this.props.currentChannelId !== id) => {
            this.props.changeChannelView(id, type)
            if(makeRequest) this.fetchChannel(id, type)
            // document.getElementById(`channel-${id}`).scrollIntoViewIfNeeded(); //non-standard, find a better solution
        }
    }
    componentWillMount() {
        this.props.fetchAllUsers().then(this.props.fetchDefaultChannel);
        // ();
        this.setupSubscription();
        // App.messaging = App.cable.subscriptions.create('ChannelsChannel', {
            //     received: this.onReceiveMessage,
            // })
            
        }
    //only "Channel" channels can be updated
    updateChannel(data, channel_id){
        const payload = { type: "UPDATE_CHANNEL", data: { channel_id, messageable_type:"CHANNEL" ,type: "TOPIC", channel: data}}  
        //console.log(payload)
        App.clientChannel.send(payload)
    }
    addUsersToDM(users){
        App.clientChannel.send({ type: "ADD_USERS_TO_CHANNEL", data: { selectedUsers: users, messageable_type: "DirectMessage" } })
    }
    addUsersToChannel(users, channel){
        //console.log(users)
        App.clientChannel.send({ type: "ADD_USERS_TO_CHANNEL", data: { selectedUsers: users, channel_id: channel.id, messageable_type: channel.messageable_type } })
    }
    fetchChannel(channel_id, type){
        App.clientChannel.send({ type: "FETCH_CHANNEL", data: { channel_id: channel_id, messageable_type: type } })
    }
    addUserToChannel(userId, channel){
        App.clientChannel.send({type: "ADD_USER_TO_CHANNEL", data: {user_id: userId, channel_id: channel.id, messageable_type: channel.messageable_type}})
        this.closeOverlay();
    }
    createChannel(data, type){
        App.clientChannel.send({type: "CREATE_CHANNEL", data: {channel: data, messageable_type: type}})
        this.closeOverlay();
    }
    hideDM(id){
        setTimeout(this.changeChannelView(1, "Channel"),110);
        App.clientChannel.send({type: "HIDE_DM", data: {dm_id: id}})
    }
    showDM(id){
        
        App.clientChannel.send({type: "SHOW_DM", data: {dm_id: id}})
    }
    fetchAllChannels() {
        App.clientChannel.send({ type: "FETCH_ALL_CHANNELS" })
    }
    deleteChannel(channelId) {
        //console.log("deleting");
        App.clientChannel.send({ type: "DELETE_CHANNEL", data: { channel_id: channelId } })
    }
    receiveClientData(data){
        switch(data.type){
            case "CHANNEL_SUCCESS":
                //console.log("SUCCESS!")
                return this.handleChannelSuccess(data.channel, data.author_id)
            case "USER_ADD":
                //console.log("WHOO WHOOO NEW USER ALERT")
                return this.handleNewUser(data.user);
            case "RECEIVE_CHANNELS":
                this.props.receiveChannels(data.channels)
                break;
            case "RECEIVE_DMS":
                this.props.receiveDMs(data.dms)
                break;
            case "DELETE_CHANNEL":
                this.changeChannelView(1, "Channel")() //gross.
                this.props.deleteChannel(data.channelId)
                break;
            case "DELETE_MESSAGE":
                this.props.deleteMessage(data.messageId);
                break;
        }
    }
    handleNewUser(user){
        this.props.receiveUser(user)
        this.fetchChannel(this.props.currentChannelId, this.props.currentChannelType)
    }
    updateChannels(ids){
        // App.clientChannel
    }
    handleChannelSuccess(channel, author_id){
        // debugger
        if(channel.messageable_type === "DirectMessage"){
            this.props.receiveDM(channel)

        }else{
            this.props.receiveChannel(channel)

        }
        // debugger
        if(author_id === this.props.currentUser.id) this.changeChannelView(channel.id, channel.messageable_type)(false)
        
    }

    setupSubscription() {
        //console.log("CONNECTING...")
        App.clientChannel = App.cable.subscriptions.create(
            {
                channel: 'ClientsChannel',
                
            },
            {
                received: this.receiveClientData,
                disconnected: ()=> this.onDiconnect,
                // connected: this.onConnected
            })

    }
    onDisconnect(){
        //console.log("hi");
        this.props.logout()
    }
    hideMenu(e){
        if(!e || e.target === e.currentTarget) this.props.hideMenu();
    }
    logout(){
        this.hideMenu();
        this.props.logout()
    }
    render(){
        let overlay = undefined
        //I'm so sorry.
        switch(this.props.overlayType){
            case "OVERLAY_CREATE_CHANNEL":
                overlay = <CreateChannelOverlay createChannel={this.createChannel} addUsersToChannel={this.addUsersToChannel}  closeOverlay={this.closeOverlay}/>
                break;
            case "OVERLAY_SHOW_CHANNELS":
                overlay = <ShowChannelsOverlay fetchAllChannels={this.fetchAllChannels} addUserToChannel={this.addUserToChannel} changeChannelView={this.changeChannelView} closeOverlay={this.closeOverlay} />
                break;
            case "OVERLAY_ADD_USERS_TO_CHANNELS":
                overlay = <AddUserOverlay addUsersToChannel={this.addUsersToChannel} closeOverlay={this.closeOverlay}/>
                break
            case "OVERLAY_TOPIC":
                overlay = <ShowTopicOverlay updateChannel={this.updateChannel} closeOverlay={this.closeOverlay}/>
                break;
            case "OVERLAY_SETTINGS":
                overlay = <ShowSettingsOverlay deleteChannel={this.deleteChannel} updateChannel={this.updateChannel} closeOverlay={this.closeOverlay}/>
                break;
            case "OVERLAY_DMS":
                overlay = <DMOverlay showDM={this.showDM} changeChannelView={this.changeChannelView} addUsersToDM={this.addUsersToDM} closeOverlay={this.closeOverlay}/>
                break;
            }
        return <div className="client">
            <div onClick={this.hideMenu} className={`menu-overlay ${this.props.showMenu ? "" : "invisible"}`}>
                
                <div className="client-menu">
                    <div className="user">
                        <i className="profile-pic fas fa-user"/>
                        <div className="user-info">
                            <span className="fullname">{`${this.props.currentUser.full_name}`}</span>
                            <span className="username">{`${this.props.currentUser.username}`}</span>
                        </div>
                    </div>
                    <ul className="menu-options">
                        {/* <li className="menu-item">Set a status</li> */}
                        {/* <li className="menu-item">Profile & account</li> */}
                        {/* <li className="menu-item">Preferences</li> */}
                        {/* <li className="menu-item">Set yourself to <span className="text-bold">away</span></li> */}
                        {/* <li className="menu-item">Help & Feedback</li> */}
                        {/* <div className="divider"/> */}
                        {/* <li className="menu-item">Invite People</li> */}
                        {/* <li className="menu-item">Analytics</li> */}
                        {/* <li className="menu-item">Customize Loose</li> */}
                        <li onClick={this.logout} className="menu-item">Sign out of <span className="text-bold">Loose</span></li>
                    </ul>
                    
                </div>
            </div>
            <ClientNavBar/>
            <div className="client-content">
                <ChannelList hideDM={this.hideDM} changeChannelView={this.changeChannelView} showOverlay={this.showOverlay} closeOverlay={this.closeOverlay}/>
                {this.props.currentChannelId ? <ChatWindow/> : ""}
            </div>
            {overlay}

        </div>  
    }
}
const mapStateToProps = (state) => ({
    currentChannelId: state.ui.chatWindow.id,
    currentChannelType: state.ui.chatWindow.type,
    currentUser: state.entities.users[state.session.id],
    showMenu: state.ui.clientMenu.showMenu,
    overlayType: state.ui.overlay.overlayType
})
const mapDispatchToProps = dispatch => ({
    fetchDefaultChannel: () => dispatch(getDefaultChannel()),
    receiveChannels: (channels) => dispatch(receiveChannels(channels)),
    receiveDMs: (dms) => dispatch(receiveDMs(dms)),
    fetchAllUsers: () => dispatch(getAllUsers()),
    changeChannelView: (id, type) => dispatch(changeChatWindowView(id, type)),
    logout: ()=> dispatch(logout()),
    hideMenu: ()=> dispatch(hideMenu()),
    receiveChannel: (channel) => new Promise(()=>dispatch(receiveChannel(channel))),
    receiveDM: (dm) => dispatch(receiveDM(dm)),
    closeOverlay: () => dispatch(closeOverlay()),
    receiveUser: (user) => dispatch(receiveUser(user)),
    // addUserToChannel: (user) => dispatch(addUserToChannel(user)),
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
    deleteMessage: (id) => dispatch(deleteMessage(id))


})
export default connect(mapStateToProps, mapDispatchToProps)(Client)
