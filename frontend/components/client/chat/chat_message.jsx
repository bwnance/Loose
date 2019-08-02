import {connect} from 'react-redux'
import React from 'react'
class ChatMessage extends React.Component{
    constructor(props){
        super(props);
        this.message = this.props.message;
        this.author= this.props.users[this.message.sender_id];
    }
    render(){
        return <li className="chat-message">
            <span>{this.author.full_name}:  </span>
            <span>{this.message.body}</span>
            <br></br>
            <br></br>
        </li>
    }
}
const mapStateToProps = (state) => ({
    users: state.entities.users
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)