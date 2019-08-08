import {connect} from 'react-redux'
import React from 'react'
import {MoreHorizontal} from 'react-feather'
import {deleteMessage, updateMessage} from '../../../actions/cable_actions'
import {CornerDownLeft} from 'react-feather'
class ChatMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = { showPopup: false, isEditing: false, editText: this.props.message.body}
        this.author = this.props.users[this.props.message.sender_id];
        
        this.subsequentMessage = false;
        
        
        this.openMessageSettings = this.openMessageSettings.bind(this)
        this.closePopup = this.closePopup.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.deleteMessage = this.deleteMessage.bind(this)
        this.editMessage = this.editMessage.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.stopEditing = this.stopEditing.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
    }
    openMessageSettings(){
        this.setState({showPopup: true});
    }
    handleClick(e){
        // debugger
        if (e.target.className !== "popup" && e.currentTarget.className !== "popup") this.setState({showPopup: false});
    }
    closePopup(){
        this.setState({ showPopup: false });
    }
    handleFormChange(e){
        this.setState({editText: e.target.value})
    }
    stopEditing(){
        this.setState({isEditing: false})
    }
    saveChanges(){
        this.stopEditing()
        this.props.updateMessage(this.props.message.id, {body: this.state.editText});
    }
    render(){
        // console.log(`MESSAGE: ${this.props.message}`)
        // this.subsequentMessage;
        // if(this.props.prevMessage){

        //     if(this.props.prevMessage.sender_id === this.props.message.sender_id){
        //         this.subsequentMessage = true;
        //     }
        //     else{
        //         this.subsequentMessage = false;
        //     }
        //     if(this.props.prevMessage.is_auto_message) this.subsequentMessage = false;
        // }else{
        //     this.subsequentMessage = false;
        // }
        // if(this.props.message.is_auto_message) this.subsequentMessage = false;
        return (

            <li className="chat-message">
                { this.state.isEditing ? 
                    (<>
                        <div className="message-info">
                            <i className="user-icon fa fa-user" />
                            <div className="message-content edit-form">
                                <span className="top-row">
                                    <input onChange={this.handleFormChange} value={this.state.editText} type="text" className="edit-form"/>
                                </span>
                                <span className="bottom-row">
                                    <button className="edit-cancel" onClick={this.stopEditing} >Cancel</button>
                                    <button className="edit-save" onClick={this.saveChanges}><div><CornerDownLeft />Save Changes</div></button>
                                </span>
                            </div>

                        </div>
                    </>) 
                    : 
                    ( <>
                        {!this.props.isTopLevelMessage ?
                        (
                            <div className="message-info">
                                <div className="timestamp-container">
                                    <span className="hover-timestamp">
                                        {/* this is broken, z-index issue*/}
                                        {/* <div className="hover-timestamp-tooltip">
                                            {this.getAMPMTime(this.props.message.created_at)}
                                        </div> */}
                                        <span>
                                            {this.getShortAMPMTime(this.props.message.created_at)}
                                        </span>
                                    </span>
                                </div>
                                <div className="message-content-secondary">

                                    <span className="message-body">
                                        {this.props.message.body}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="message-info">
                                <i className="user-icon fa fa-user" />
                                <div className="message-content">
                                    <span className="top-row">
                                        <span className="message-author">
                                            {this.author.full_name}
                                        </span>
                                        <span className="message-timestamp">
                                            {this.getShortAMPMTime(this.props.message.created_at)}
                                        </span>
                                    </span>
                                    <span className={`message-body ${this.props.message.is_auto_message ? "auto-message" : ""}`}>{this.props.message.body}</span>
                                </div>

                            </div>
                        )}
                        <div className="message-tooltip">
                            <button onClick={this.openMessageSettings} className="tooltip-button"><MoreHorizontal className="more" /></button>
                        </div>
                        {this.state.showPopup ?
                            <>
                                <div className="popup">
                                    <div onClick={this.editMessage} className="popup-item">
                                        <button >Edit Message</button>
                                    </div>
                                    <div onClick={this.deleteMessage} className="popup-item">
                                        <button>Delete Message</button>
                                    </div>
                                </div>
                                <div onClick={this.handleClick} className="popup-overlay">
                                </div>
                            </>
                            : null
                        }
                    </>
                    )
                }                          
        </li>
        
        )

    }
    editMessage(){
        console.log("editing")
        this.setState({isEditing: true})
        this.closePopup();
    }
    deleteMessage(){
        this.closePopup();
        this.props.deleteMessage(this.props.message)
        // if(!this.props.prevMessage.subsequentMessage) this.subsequentMessage = false
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
        if (hours === 0) hours = 12 ;
        hours = hours < 10 ? `0${hours}` : `${hours}`
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
    deleteMessage: id=>dispatch(deleteMessage(id)),
    updateMessage: (id, data) => dispatch(updateMessage(id, data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)