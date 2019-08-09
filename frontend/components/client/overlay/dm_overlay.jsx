import React from 'react'
import { connect } from 'react-redux'
import CloseOverlayBtn from './common/close_overlay_btn'
import SearchDMsField from './common/search_dms_field'
import _ from 'lodash'
class DMOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { searchUser: "", selectedUsers: [],selectedDMs: [], foundDMs: [], foundUsers: [] }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setStateFromChild = this.setStateFromChild.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.dmExists = this.dmExists.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        // //console.log(this.state.selectedUsers)
        // this.props.addUsersToChannel(this.state.selectedUsers, this.props.currentChannel.id, "Channel");
        const foundDM = this.dmExists(this.state.selectedUsers.concat(this.props.currentUser.id))
        if (foundDM) {
            this.props.closeOverlay();
            this.props.showDM(foundDM.id)
            this.props.changeChannelView(foundDM.id, "DirectMessage")()
            return
        }
        this.props.addUsersToDM(this.state.selectedUsers.concat(this.props.currentUser.id))
        this.resetState()
        this.props.closeOverlay();

    }
    dmExists(user_ids) {
        return Object.values(this.props.dms).find(dm => _.isEqual(_.sortBy(dm.user_ids), _.sortBy(user_ids)))
        // return Object.values(this.props.dms).some(dm => )
    }
    handleInput(type) {
        return (e) => {
            // //console.log(e.target.value)
            this.setState({ [type]: e.target.value })
        }
    }
    setStateFromChild(state) {
        // //console.log(state)
        this.setState(state)
    }
    resetState() {
        this.setState({ searchUser: "", foundUsers: [], selectedUsers: [] })
    }
    render() {
        return (
            <div className="client-overlay add-users-overlay dm-overlay">
                <CloseOverlayBtn />
                <div className="add-users-overlay-content dm-overlay-content">
                    <h2>
                        Direct Messages
                    </h2>
                    <form className="overlay-form add-users-form" onSubmit={this.handleSubmit}>
                        <SearchDMsField closeOverlay={this.props.closeOverlay} changeChannelView={this.props.changeChannelView} dmExists={this.dmExists} setParentState={this.setStateFromChild} handleInput={this.handleInput} />
                        <input className="overlay-submit" type="submit" value="Add" />
                    </form>
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentChannel: state.entities.channels[state.ui.chatWindow.id],
    currentUser: state.entities.users[state.session.id],
    dms: state.entities.dms
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(DMOverlay)