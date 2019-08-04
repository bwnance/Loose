import React from 'react'
import {connect} from 'react-redux'
import Channel from './channels/channel'
import ChannelList from './channels/channel_list'
import ChatWindow from './chat/chat_window'
import {getAllUsers} from '../../actions/users_actions'
import { getDefaultChannel} from '../../actions/ui_actions'
class Client extends React.Component {
    constructor(props) {
        super(props)
        this.onReceiveMessage = this.onReceiveMessage.bind(this)
        this.state = {messages: []}
    }
    componentWillUnmount() {
        App.cable.disconnect();

    }
    onReceiveMessage(message){
        //console.log(message);
        this.setState({messages: this.state.messages.concat(message.body)})
    }
    componentDidMount() {
        this.props.fetchDefaultChannel();
        this.props.fetchAllUsers();
        // App.messaging = App.cable.subscriptions.create('ChannelsChannel', {
        //     received: this.onReceiveMessage,
        // })
    }
    render(){
        return <div className="client">
            <ChannelList/>
            {this.props.currentChannelId ? <ChatWindow/> : ""}
        </div>  
    }
}
const mapStateToProps = (state) => ({
    currentChannelId: state.ui.chatWindow.id
})
const mapDispatchToProps = dispatch => ({
    fetchDefaultChannel: () => dispatch(getDefaultChannel()),
    fetchAllUsers: () => dispatch(getAllUsers()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Client)
