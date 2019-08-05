import {connect} from 'react-redux'
import React from 'react'
import {receiveMessage, fetchMessages} from '../../../actions/messages_actions'
import {getUsers,getUser} from '../../../actions/users_actions.js'
import ChatMessage from './chat_message'
import ChatMessageList from './chat_message_list'
import ChatForm from './chat_form';
class ChatWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {currentChannelId: this.props.currentChannelId, messages: []}
        this.populateMessages = this.populateMessages.bind(this)
        this.receiveMessage = this.receiveMessage.bind(this)
    }
    
    render(){
        let prevMessage = null;
        const messages = this.props.messages.map((message)=>{
            let cm = <ChatMessage prevMessage={prevMessage} key={`message-${message.id}`} message={message}/>
            prevMessage = message
            return cm;
        })
        return (
            <div className="chat-window">
                <ChatMessageList messages={messages}/>
                <ChatForm onSubmit={this.handleMessageSubmit.bind(this)}/>
            </div>
        )
    }
    handleMessageSubmit(body){
        App.messaging.send({body})
    }
    setupSubscription(){
        //console.log("CONNECTING...")
        App.messaging = App.cable.subscriptions.create(
            {
            channel: 'MessagesChannel', 
            channel_id: this.props.currentChannelId
        },
        {
            received: this.receiveMessage,
        //connected: () => console.log("CONNECTED")}
        })

    }
    receiveMessage(message){
        if(!message.sender_id || !message.id) {
            console.log("weird message received")
            debugger
            return 
        }
        if (this.props.users.every((user) => user.id !== message.sender_id)) {
            this.props.getUser(message.sender_id).then(()=>this.props.receiveMessage(message))
        }
        else{
            this.props.receiveMessage(message)
        }
    }
    componentWillUnmount(){
        App.messaging.unsubscribe();
    }
    componentDidUpdate(){
        if(this.state.currentChannelId !== this.props.currentChannelId){
            this.setState({ currentChannelId: this.props.currentChannelId })
            this.populateMessages();
            App.messaging.unsubscribe();
            this.setupSubscription();
        }
    }
    
    populateMessages(){
        const channelId = this.props.currentChannelId
        return this.props.populateMessages(channelId)

    }
    componentDidMount(){
        
        //connect to live chat and populate messages slice of state
        this.populateMessages()
        this.setupSubscription();
        //console.log(this.props.currentChannelId)

    }
}
const mapStateToProps = (state) =>({
    currentChannelId: state.ui.chatWindow.id,
    messages: Object.values(state.entities.messages),
    users: Object.values(state.entities.users)
})

const mapDispatchToProps = (dispatch) => ({
    getUser: (userId) => dispatch(getUser(userId)),
    populateMessages: (channelId) => dispatch(fetchMessages(channelId)),
    receiveMessage: (message) => dispatch(receiveMessage(message))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow)