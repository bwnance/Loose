import React from 'react'
import {connect} from 'react-redux'
import Channel from './channels/channel'
import createActionCable from '../../util/cable_util'
import ChannelList from './channels/channel_list'
class Client extends React.Component {
    constructor(props) {
        super(props)
        this.onReceiveMessage = this.onReceiveMessage.bind(this)
        this.state = {messages: []}
    }
    componentWillUnmount() {
        App.messaging = undefined;
    }
    onReceiveMessage(message){
        console.log(message);
        this.setState({messages: this.state.messages.concat(message.body)})
    }
    componentDidMount() {
        App.messaging = App.cable.subscriptions.create('MessagesChannel', {
            received: this.onReceiveMessage,
            connected: ()=>console.log("connected")
        })
        App.messaging = App.cable.subscriptions.create('ChannelsChannel', {
           
        })
    }
    render(){
        return <div className="client">
            <ChannelList/>
        </div>
    }
}
export default Client
