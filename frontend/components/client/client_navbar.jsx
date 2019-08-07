import React from 'react'
import { logout } from '../../actions/session'
import {connect} from 'react-redux'
import {showMenu, showTopicOverlay} from '../../actions/ui_actions'
class ClientNavBar extends React.Component {
    constructor(props){
        super(props)
        this.showMenu = this.showMenu.bind(this);
        this.onTopicClick = this.onTopicClick.bind(this)
    }
    showMenu(){
        this.props.showMenu();
    }
    onTopicClick(e){
        e.preventDefault();
        this.props.showTopicOverlay();
    }
    render(){
        return (
            <div className="client-navbar">
                <div onClick={this.showMenu} className="channel-section">
                    <div className="first-row">
                        <span className='client-workspace-title-container'>
                        <span className="client-workspace-title">Loose</span>
                        <i className="dropdown-btn fa fa-angle-down" /></span>
                        <i className="client-notifications-btn fa fa-bell"/>
                    </div>
                    <div className="second-row">
                        <span className="current-user-container"><i className="user-active fa fa-circle" /><span className="current-user-name">&nbsp;&nbsp;{this.props.currentUser.full_name}</span></span>
                    </div>
                   
                </div>
                <div className="chat-section">
                    <span className="left-side">
                        <span className="channel-name">
                            {`#${this.props.currentChannel && this.props.currentChannel.title}`}
                        </span>
                        <span className="channel-info">
                            <i className="fa fa-star" />
                            <span className="info-seperator"/>
                            <span onClick={this.show} className="info-container view-users">
                                <i className="fa fa-user" />
                                <span className="info num-users">{`${this.props.currentChannel && this.props.currentChannel.user_ids.length}`}</span>
                            </span>
                            <span className="info-seperator"/>
                            <span className="info-container view-pinned">
                                <i className="fa fa-thumbtack" />
                                <span className="info num-pinned">0</span>
                            </span>
                            <span className="info-seperator add-topic"/>
                            <span onClick={this.onTopicClick} className="info-container topic-container">
                                {/* <i className="fa fa-pencil-alt" /> */}
                                {this.props.currentChannel && this.props.currentChannel.topic ? 
                                    <span className="topic-text">{this.props.currentChannel.topic}</span> 
                                    : 
                                    <>
                                        <i className="fa fa-pencil-alt" />
                                        <span className="topic-text">Add a topic</span>
                                    </>}
                            </span>
                            <span className="edit-text">Edit</span>
                        </span>
                    </span>
                    <span className="right-side">
                        <i className="fa fa-phone-alt" />
                        <i className="fa fa-info-circle" />
                        <i className="fa fa-cog" />
                        <i className="divider"/>
                        <i className="fa fa-search" />
                        <i className="fa fa-at" />
                        <i className="fa fa-star" />
                        <i className="fa fa-ellipsis-v" />
                    </span>
                    
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    currentChannel: state.entities.channels[state.ui.chatWindow.id]
})
const mapDispatchToProps = (dispatch) => ({
    showMenu: () => dispatch(showMenu()),
    showTopicOverlay: () => dispatch(showTopicOverlay())
})
export default connect(mapStateToProps, mapDispatchToProps)(ClientNavBar)