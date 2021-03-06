import React from 'react'
import { connect } from 'react-redux'
import {closeOverlay} from '../../../actions/ui_actions'
import {updateChannel} from '../../../actions/cable_actions'
import SettingsNavBar from './settings/settings_navbar'
import MainSettings from './settings/main_settings'
import RenamePage from './settings/rename_page'
import PurposePage from './settings/purpose_page'
import DeletePage from './settings/delete_page'
import { getCurrentChannel } from '../../../util/messageable_util'

// import { deleteChannel, addUsersToChannel } from '../../../actions/channel_actions'
class SettingsOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentPage: "MAIN" }
        this.setStateFromChild = this.setStateFromChild.bind(this)
        this.goBack = this.goBack.bind(this)
        this.changeView = this.changeView.bind(this)
        this.deleteChannel = this.deleteChannel.bind(this)
        this.renameChannel = this.renameChannel.bind(this)
        this.setPurpose = this.setPurpose.bind(this)
    }
    
    setStateFromChild(state) {
        //console.log(state)
        this.setState(state)
    }
    resetState() {
        this.setState({ currentPage: "MAIN"})
    }
    deleteChannel(){
        setTimeout(()=>this.props.closeOverlay());
        this.props.deleteChannel(this.props.currentChannel.id);
    }
    goBack(){
        this.changeView("MAIN")()
    }
    changeView(pageName){
        return ()=>{
            this.setState({ currentPage: pageName})
        }
    }
    renameChannel(value){
        this.props.updateChannel(this.props.currentChannel.id, {title: value}, "TITLE");
    }
    setPurpose(value){
        this.props.updateChannel(this.props.currentChannel.id, {purpose: value}, "PURPOSE");
    }
    render() {
        let content = "";
        switch (this.state.currentPage) {
            case "MAIN":
                content = <MainSettings changeView={this.changeView}/>
                break;
            case "RENAME":
                content = <RenamePage closeOverlay={this.props.closeOverlay} currentChannel={this.props.currentChannel} renameChannel={this.renameChannel}/>
                break;
            case "PURPOSE":
                content = <PurposePage closeOverlay={this.props.closeOverlay} currentChannel={this.props.currentChannel} setPurpose={this.setPurpose} />
                break;
            case "DELETE":
                content = <DeletePage deleteChannel={this.deleteChannel} closeOverlay={this.props.closeOverlay} currentChannel={this.props.currentChannel}/>
                break;
        }
        return (
            <div className="client-overlay settings-overlay">
                <SettingsNavBar closeOverlay={this.props.closeOverlay} currentChannel={this.props.currentChannel} currentPage={this.state.currentPage} goBack={this.goBack}/>
                <div className="settings-overlay-content">
                    {content}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentChannel: getCurrentChannel(state)
})
const mapDispatchToProps = (dispatch) => ({
    closeOverlay: () => dispatch(closeOverlay()),
    updateChannel: (channel_id, data, type) => dispatch(updateChannel(channel_id, data, type))
})
export default connect(mapStateToProps, mapDispatchToProps)(SettingsOverlay)