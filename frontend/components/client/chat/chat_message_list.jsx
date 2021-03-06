import React from 'react'
class ChatMessageList extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidUpdate(nextProps){
        //new message arrived, scroll to the bottom!
        if(this.props.messages.length !== nextProps.messages.length){
            document.getElementById("messages-end").scrollIntoView();
            // document.getElementsByClassName("window-message-list")[0].scrollTop = 9999999;
        }
    }
    render(){
        // debugger
        return (
        <ul className="window-message-list">
            {this.props.messages}
            <div id="messages-end"></div>
        </ul>
        )
    }
}
export default ChatMessageList

