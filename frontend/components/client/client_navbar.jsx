import React from 'react'
import { logout } from '../../actions/session'
import {connect} from 'react-redux'
import { getCurrentChannel} from '../../util/messageable_util'
import { showMenu, showTopicOverlay, showSettingsOverlay, showAddUserToChannelOverlay} from '../../actions/ui_actions'
class ClientNavBar extends React.Component {
    constructor(props){
        super(props)
        this.showMenu = this.showMenu.bind(this);
        this.onTopicClick = this.onTopicClick.bind(this)
        this.showAddUserToChannelOverlay = this.showAddUserToChannelOverlay.bind(this)
        this.showSettingsOverlay = this.showSettingsOverlay.bind(this)
    }
    showMenu(){
        this.props.showMenu();
    }
    onTopicClick(e){
        e.preventDefault();
        this.props.showTopicOverlay();
    }
    showSettingsOverlay(e){
        e.preventDefault();
        this.props.showSettingsOverlay();
    }
    showAddUserToChannelOverlay(e){
        e.preventDefault();
        this.props.showAddUserToChannelOverlay();
    }
    render(){
        const isOwner = this.props.currentChannel && this.props.currentChannel.owner
        return (
            <>
            <div className={`popupSettings ${this.showPopup ? "" : ""}`}>

            </div>
            <div className="client-navbar">
                <div onClick={this.showMenu} className="channel-section">
                    <div className="first-row">
                        <span className='client-workspace-title-container'>
                        <span className="client-workspace-title">Loose</span>
                        <i className="dropdown-btn fa fa-angle-down" /></span>
                        {/* <i className="client-notifications-btn fa fa-bell"/> */}
                    </div>
                    <div className="second-row">
                        <span className="current-user-container"><i className="user-active fa fa-circle" /><span className="current-user-name">&nbsp;&nbsp;{this.props.currentUser.full_name}</span></span>
                    </div>
                </div>
                <div className="chat-section">
                    <span className="left-side">
                            {this.props.currentChannel && this.props.currentChannel.messageable_type === "DirectMessage"? 
                            (
                                    <div className={`channel-name dm-name`}>
                                        <span>
                                            {`${this.props.currentChannel && this.props.currentChannel.title}`}
                                        </span>
                                    </div>
                            ) : (
                                   
                                        isOwner ?
                                            <div className = {`channel-name`}>
                                                <span className="channel-span" onClick={this.showSettingsOverlay}>
                                                    {`#${this.props.currentChannel && this.props.currentChannel.title}`}
                                                </span> 
                                            </div>
                                        : 
                                            <div className={`channel-name no-hover`}>
                                            <span className="channel-span no-hover">
                                                    {`#${this.props.currentChannel && this.props.currentChannel.title}`}
                                                </span>
                                            </div>
                                        
                                    
                            ) }
                       
                       
                        <span className="channel-info">
                            {/* <i className="fa fa-star" />
                            <span className="info-seperator"/> */}
                            <span onClick={this.showAddUserToChannelOverlay} className="info-container view-users">
                                <i className="fa fa-user" />
                                <span className="info num-users">{`${this.props.currentChannel && this.props.currentChannel.user_ids.length}`}</span>
                            </span>
                            {/* <span className="info-seperator"/>
                            <span className="info-container view-pinned">
                                <i className="fa fa-thumbtack" />
                                <span className="info num-pinned">0</span>
                            </span> */}
                            
                            {this.props.currentChannel && this.props.currentChannel.messageable_type !== "DirectMessage" ?
                            (<>
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
                            </>) : null}
                            <span className="edit-text">Edit</span>
                        </span>
                    </span>
                    <span className="right-side">
                        {/* //<i className="fa fa-phone-alt" /> */}
                        {/* <i className="fa fa-info-circle" /> */}
                        {this.props.currentChannel && this.props.currentChannel.messageable_type === "DirectMessage" || !isOwner ? null : <i onClick={this.showSettingsOverlay} className="fa fa-cog" />}
                        {/* <i className="divider"/> */}
                        {/* <i className="fa fa-search" /> */}
                        {/* <i className="fa fa-at" /> */}
                        {/* <i className="fa fa-star" /> */}
                        {/* <i className="fa fa-ellipsis-v" /> */}
                    </span>
                    
                </div>

            </div>
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    currentChannel: getCurrentChannel(state)
})
const mapDispatchToProps = (dispatch) => ({
    showMenu: () => dispatch(showMenu()),
    showTopicOverlay: () => dispatch(showTopicOverlay()),
    showAddUserToChannelOverlay: () => dispatch(showAddUserToChannelOverlay()),
    showSettingsOverlay: () => dispatch(showSettingsOverlay())
})
export default connect(mapStateToProps, mapDispatchToProps)(ClientNavBar)