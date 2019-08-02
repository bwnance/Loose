import {connect} from 'react-redux'
import React from 'react'
import {receiveMessage, fetchMessages} from '../../../actions/messages_actions'
import {getUsers} from '../../../actions/users_actions.js'
import ChatMessage from './chat_message'
class ChatWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {body: "",currentChannelId: this.props.currentChannelId, messages: []}
        this.populateMessages = this.populateMessages.bind(this)
        this.receiveMessage = this.receiveMessage.bind(this)
        this.handleBodyUpdate = this.handleBodyUpdate.bind(this)
    }
    handleBodyUpdate(e){
        this.setState({body: e.target.value})
    }
    render(){
        const messages = this.props.messages.map((message)=>{
            return <ChatMessage key={`message-${message.id}`} message={message}/>
        })
        return (
            <div className="chat-window">
                <ul className="window-message-list">
                    {messages}
                </ul>
                <form className="message-form" onSubmit={this.handleMessageSubmit(this)}>
                    <input value={this.state.body} onChange={this.handleBodyUpdate}type="text" className="message-input" placeholder="Message channel"/>
                </form>
            </div>
        )
    }
    handleMessageSubmit(that){
        return (e) =>{
            e.preventDefault()
            const body = e.target[0].value
            that.setState({body: ""})
            App.messaging.send({body})
        }
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
        this.props.receiveMessage(message)
    }
    componentDidUpdate(){
        if(this.state.currentChannelId !== this.props.currentChannelId){
            this.setState({ currentChannelId: this.props.currentChannelId })
            this.populateUsers();
            this.populateMessages();
            this.setupSubscription()
        }
    }
    populateUsers(){
        const channelId = this.props.currentChannelId
        return this.props.populateUsers(channelId)
    }
    populateMessages(){
        const channelId = this.props.currentChannelId
        return this.props.populateMessages(channelId)

    }
    componentDidMount(){
        //connect to live chat and populate messages slice of state
        this.populateUsers().then(this.populateMessages)
        this.setupSubscription();
        //console.log(this.props.currentChannelId)

    }
}
const mapStateToProps = (state) =>({
    currentChannelId: state.ui.chatWindow.id,
    messages: Object.values(state.entities.messages)
})

const mapDispatchToProps = (dispatch) => ({
    populateMessages: (channelId) => dispatch(fetchMessages(channelId)),
    populateUsers: (channelId) => dispatch(getUsers(channelId)),
    receiveMessage: (message) => dispatch(receiveMessage(message))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow)