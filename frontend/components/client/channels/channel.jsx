import React from 'react';
class Channel extends React.Component {
    constructor(props){
        super(props);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleReceivedChannel = this.handleReceivedChannel.bind(this)
        this.messages = []
    }
    handleMessage(message){
        ////console.log(message.body);
        this.messages.concat(message.body)
    }
    handleReceivedChannel(channel){
        ////console.log(channel)
    }
    render(){
        
        return (
            <> 
               
            </>
        )
        
    }
}
export default Channel;