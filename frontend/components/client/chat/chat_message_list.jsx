import React from 'react'
class ChatMessageList extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidUpdate(nextProps){
        //new message arrived, scroll to the bottom!
        if(this.props.messages.length !== nextProps.messages.length){
            document.getElementById("messages-end").scrollIntoView();
            const list = document.getElementsByClassName("window-message-list")[0]
            const clientWindow = document.getElementsByClassName("chat-window")[0]
            const listStyle = getComputedStyle(list)
            const listHeight = parseInt(listStyle.getPropertyValue("height"))
            const clientWindowStyle = getComputedStyle(clientWindow)
            const clientWindowHeight = parseInt(clientWindowStyle.getPropertyValue("height"))
            console.log(listHeight)
            if(listHeight < clientWindowHeight){

                
            }
        }

        
    }
    render(){
        return (
        <ul className="window-message-list">
            {this.props.messages}
            <div id="messages-end"></div>

        </ul>
        
        )
    }
}
export default ChatMessageList

