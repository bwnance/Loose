import {connect} from 'react-redux'
import React from 'react'
import {receiveMessage, fetchMessages, deleteMessage} from '../../../actions/messages_actions'
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
        const messages = [];
        for (let i = 0; i < this.props.messages.length; i++){

            const message = this.props.messages[i]

            const prevMessage = this.props.messages[i-1];
            const isTopLevelMessage = false;
            // debugger
            if(prevMessage){
                if (prevMessage && prevMessage.sender_id !== message.sender_id){
                    isTopLevelMessage = true;
                }
                if (prevMessage.is_auto_message){
                    isTopLevelMessage = true;
                }
                    
            }
            else{
                isTopLevelMessage = true;
            }
            if (message.is_auto_message) {
                isTopLevelMessage = true;
            }

            messages.push(<ChatMessage isTopLevelMessage={isTopLevelMessage} key={`message-${message.id}`} message={message} />)

        }
        // const messages = this.props.messages.map((message)=>{
        //     return <ChatMessage
        // }

        // let prevMessage;
        // const messages = this.props.messages.map((message)=>{
        //     let cm = <ChatMessage isTopLevelMessage={true} prevMessage={prevMessage} key={`message-${message.id}`} message={message}/>
        //     prevMessage = message
        //     return cm;
        // })
        // debugger
        return (
            <div className="chat-window">
                <ChatMessageList messages={messages}/>
                <ChatForm onSubmit={this.handleMessageSubmit.bind(this)}/>
            </div>
        )
    }
    handleMessageSubmit(body){
        App.messaging.send({type: "NEW_MESSAGE", data: {body, messageable_type: this.props.currentChannelType}})
    }
    setupSubscription(){
        ////console.log("CONNECTING...")
        // debugger
        App.messaging = App.cable.subscriptions.create(
        {
            channel: 'MessagesChannel',
            messageable_id: this.props.currentChannelId, 
            messageable_type: this.props.currentChannelType
        },
        {
            received: this.receiveMessage,
        //connected: () => //console.log("CONNECTED")}
        })
    }
    receiveMessage(payload){
        switch(payload.type){
            case "NEW_MESSAGE":
                // debugger
                const message = payload.message
                // if (this.props.users.every((user) => user.id !== message.sender_id)) {
                if (!this.props.users[message.sender_id]){
                    this.props.getUser(message.sender_id).then(() => this.props.receiveMessage(message))
                }
                else {
                    this.props.receiveMessage(message)
                }
            break
            case "DELETE_MESSAGE":
                this.props.deleteMessage(payload.messageId)
            break
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
        return this.props.populateMessages(channelId, this.props.currentChannelType)

    }
    componentDidMount(){
        
        //connect to live chat and populate messages slice of state
        this.populateMessages()
        this.setupSubscription();
        ////console.log(this.props.currentChannelId)

    }
}
const mapStateToProps = (state) => {
    //console.log("msp");
    // debugger
    return {
        currentChannelId: state.ui.chatWindow.id,
        currentChannelType: state.ui.chatWindow.messageableType,
        messages: Object.values(state.entities.messages),
        users: state.entities.users
    }
}


const mapDispatchToProps = (dispatch) => ({
    getUser: (userId) => dispatch(getUser(userId)),
    populateMessages: (channelId, type) => dispatch(fetchMessages(channelId, type)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    deleteMessage: (message) => dispatch(deleteMessage(message))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow)