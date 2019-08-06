import React from 'react'
import {connect} from 'react-redux'
import Channel from './channels/channel'
import ChannelList from './channels/channel_list'
import ChatWindow from './chat/chat_window'
import {getAllUsers} from '../../actions/users_actions'
import { getDefaultChannel, changeChatWindowView, hideMenu} from '../../actions/ui_actions'
import CreateChannelOverlay from './create_channel_overlay'
import ClientNavBar from './client_navbar'
import { logout } from '../../actions/session'
import {receiveChannel} from '../../actions/channel_actions'
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
    }
    showOverlay() {
        this.setState({ showOverlay: true });
    }
    closeOverlay() {
        this.setState({ showOverlay: false });
    }
    componentWillUnmount() {
        App.cable.disconnect();
    }
    onReceiveMessage(message){
        //console.log(message);
        this.setState({messages: this.state.messages.concat(message.body)})
    }
    changeChannelView(id) {
        return () => {
            this.props.changeChannelView(id)
            document.getElementById(`channel-${id}`).scrollIntoViewIfNeeded(); //non-standard, find a better solution
        }
    }
    componentDidMount() {
        this.props.fetchDefaultChannel();
        this.props.fetchAllUsers();
        this.setupSubscription();
        // App.messaging = App.cable.subscriptions.create('ChannelsChannel', {
        //     received: this.onReceiveMessage,
        // })

    }
    addUsersToChannel(users, channelId){
        users.forEach(userId => {
            this.addUserToChannel(userId, channelId);
        })
    }
    addUserToChannel(userId, channelId){
        App.clientChannel.send({type: "ADD_USERS_TO_CHANNEL", user_id: userId, channel_id: channelId})
    }
    createChannel(data){
        console.log(data)
        App.clientChannel.send({type: "CREATE_CHANNEL", data: data})
        this.closeOverlay();
        
    }
    receiveClientData(data){
        switch(data.type){
            case "CHANNEL_SUCCESS":
                return this.handleChannelSuccess(data.channel, data.author_id);
        }
    }
    handleChannelSuccess(channel, author_id){
        this.props.receiveChannel(channel)
        if(author_id === this.props.currentUser.id) this.changeChannelView(channel.id)()
        
    }
    setupSubscription() {
        //console.log("CONNECTING...")
        App.clientChannel = App.cable.subscriptions.create(
            {
                channel: 'ClientsChannel',
                user_id: this.props.currentUser.id
            },
            {
                received: this.receiveClientData,
                //connected: () => console.log("CONNECTED")}
            })

    }
    hideMenu(e){
        if(!e || e.target === e.currentTarget) this.props.hideMenu();
    }
    logout(){
        this.hideMenu();
        this.props.logout()
    }
    render(){
        
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
                        <li className="menu-item">Set a status</li>
                        <li className="menu-item">Profile & account</li>
                        <li className="menu-item">Preferences</li>
                        <li className="menu-item">Set yourself to <span className="text-bold">away</span></li>
                        <li className="menu-item">Help & Feedback</li>
                        <div className="divider"/>
                        <li className="menu-item">Invite People</li>
                        <li className="menu-item">Analytics</li>
                        <li className="menu-item">Customize Loose</li>
                        <li onClick={this.logout} className="menu-item">Sign out of <span className="text-bold">Loose</span></li>
                    </ul>
                    
                </div>
            </div>
            <ClientNavBar/>
            <div className="client-content">
                <ChannelList changeChannelView={this.changeChannelView} showOverlay={this.showOverlay} closeOverlay={this.closeOverlay}/>
                {this.props.currentChannelId ? <ChatWindow/> : ""}
            </div>
            <CreateChannelOverlay createChannel={this.createChannel} addUsersToChannel={this.addUsersToChannel} changeChannelView={this.changeChannelView} closeOverlay={this.closeOverlay} className={this.state.showOverlay ? "" : " transparent"} />

        </div>  
    }
}
const mapStateToProps = (state) => ({
    currentChannelId: state.ui.chatWindow.id,
    currentUser: state.entities.users[state.session.id],
    showMenu: state.ui.clientMenu.showMenu
})
const mapDispatchToProps = dispatch => ({
    fetchDefaultChannel: () => dispatch(getDefaultChannel()),
    fetchAllUsers: () => dispatch(getAllUsers()),
    changeChannelView: (id) => dispatch(changeChatWindowView(id)),
    logout: ()=> dispatch(logout()),
    hideMenu: ()=> dispatch(hideMenu()),
    receiveChannel: (channel)=> new Promise(()=>dispatch(receiveChannel(channel)))


})
export default connect(mapStateToProps, mapDispatchToProps)(Client)
