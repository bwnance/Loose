import {connect} from 'react-redux'
import React from 'react'
class ChatMessage extends React.Component{
    constructor(props){
        super(props);
        this.message = this.props.message;
        this.prevMessage = this.props.prevMessage;
        this.author= this.props.users[this.message.sender_id];
    }
    render(){
        let subsequentMessage;
        if(this.prevMessage){

            if(this.prevMessage.sender_id === this.message.sender_id){
                subsequentMessage = true;
            }
            else{
                subsequentMessage = false;
            }
            if(this.prevMessage.is_auto_message) subsequentMessage = false;
        }else{
            subsequentMessage = false;
        }
        if(this.message.is_auto_message) subsequentMessage = false;
        return subsequentMessage ? 
            (<li className="chat-message">
                <div className="timestamp-container">
                    <span className="hover-timestamp">
                        {/* this is broken, z-index issue*/}
                        {/* <div className="hover-timestamp-tooltip">
                            {this.getAMPMTime(this.message.created_at)}
                        </div> */}
                        <span>
                            {this.getShortAMPMTime(this.message.created_at)}
                        </span>
                    </span>
                </div>
                <div className="message-content-secondary">
                    
                    <span className="message-body">
                        {this.message.body}
                    </span>
                </div>
            </li>) 
        :
            (
            <li className="chat-message">
                
                <i className="user-icon fa fa-user"/>
                <div className="message-content">
                    <span className="top-row">
                        <span className="message-author">
                            {this.author.full_name}
                        </span>
                        <span className="message-timestamp">
                            {this.getShortAMPMTime(this.message.created_at)}
                        </span>
                    </span>
                    <span className={`message-body ${this.message.is_auto_message ? "auto-message" : ""}`}>{this.message.body}</span>
                </div>
        </li>) 

    }
    getAMPMTime(dateString){
        const date = new Date(dateString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        hours = hours % 12;
        const result =  `${hours}:${minutes}:${seconds} ${ampm}`
        return result

    }
    getShortAMPMTime(dateString){
        const date = new Date(dateString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        // hours = hours < 10 ? `0${hours}` : `${hours}`
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        const result =  `${hours}:${minutes} ${ampm}`
        return result

    }
}
const mapStateToProps = (state) => ({
    users: state.entities.users
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)