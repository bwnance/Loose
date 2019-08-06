import React from 'react'
import { connect } from 'react-redux'
import { changeChatWindowView, closeOverlay, showCreateChannelOverlay } from '../../../actions/ui_actions'
import moment from 'moment'
import CloseOverlayBtn from './common/close_overlay_btn'
class ShowChannelsOverlay extends React.Component {
    constructor(props){
        super(props)
        this.state = { joinableChannels: this.props.joinableChannels, searchInput: ""}
    }
    handleInput(e){
        this.setState({searchInput: ""})
    }
    handleJoinChannelClick(channelId){
        return (e) => {
            e.preventDefault();
            this.props.addUserToChannel(this.props.currentUserId, channelId)

        }
    }
    handleJoinedChannelClick(id){
        return (e) => {
            this.props.changeChannelView(id)();
            this.props.closeOverlay();
        }
    }
    render(){
        const channelList = this.state.joinableChannels.map(channel =>{
            return (
                <li onClick={this.handleJoinChannelClick(channel.id)} key={`channel-${channel.id}`} className="browse-channel-item">
                    <div className="channel-info">
                        <div className="channel-title">
                            #{channel.title}
                        </div>
                        <div className="channel-date">
                            Created on&nbsp;{(new Date(channel.created_at)).toLocaleString('en-us', { month: "long", day: "numeric", year: "numeric" })}
                            {/* {channel.created_at} */}
                        </div>
                    </div>
                    <i className="fas fa-level-down-alt enter-icon">

                    </i>
                </li>
            )
        })
        const joinedChannelList = this.props.joinedChannels.map(channel =>{
            return(
                <li onClick={this.handleJoinedChannelClick(channel.id)} key={`channel-${channel.id}`} className="browse-channel-item">
                    <div className="channel-info">
                        <div className="channel-title">
                            #{channel.title}
                        </div>
                        <div className="channel-date">
                            Created on&nbsp;{(new Date(channel.created_at)).toLocaleString('en-us', { month: "long", day: "numeric", year: "numeric" })}
                            {/* {channel.created_at} */}
                        </div>
                    </div>
                    <i className="fas fa-level-down-alt enter-icon">

                    </i>
                </li>
            )
        })
        // debugger
        return (
            <div className="client-overlay">
                <CloseOverlayBtn />
                <div className="show-channels-overlay-content">
                <div className="top-bar">
                    <h1>
                        Browse Channels
                    </h1>
                        <div onClick={this.props.showCreateChannelOverlay} className="overlay-button">
                        Create Channel
                    </div>
                </div>
                <input type="text" onChange={this.handleInput} className="loose-text-input overlay-text-input" placeholder="Search Channels"/>
                <ul className="show-channels-list scrollable">
                    <div className="browse-divider first-divider">
                        Channels you can join
                    </div>
                    {channelList}
                    <div className="browse-divider">
                        Channels you belong to
                    </div>
                    {joinedChannelList}
                </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    joinableChannels: Object.values(state.entities.channels).filter(channel => !state.entities.users[state.session.id].channel_ids.includes(channel.id)),
    joinedChannels: Object.values(state.entities.channels).filter(channel => state.entities.users[state.session.id].channel_ids.includes(channel.id)),
    currentUserId: state.entities.users[state.session.id].id

})
const mapDispatchToProps = (dispatch) => ({ 
    closeOverlay: ()=> dispatch(closeOverlay()),
    showCreateChannelOverlay: ()=> dispatch(showCreateChannelOverlay())
})
export default connect(mapStateToProps, mapDispatchToProps)(ShowChannelsOverlay);