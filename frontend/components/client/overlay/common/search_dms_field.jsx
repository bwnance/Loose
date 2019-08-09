import React from 'react'
import {connect} from 'react-redux'
import UsersDropdown from './users_dropdown'
import _ from 'lodash';
class SearchDMsField extends React.Component {
    constructor(props) {
        super(props)
        this.keyUp = this.keyUp.bind(this);
        this.selectUser = this.selectUser.bind(this)
        this.onClick = this.onClick.bind(this);
        this.handleSearchBarInput = this.handleSearchBarInput.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.state = { searchUser: "", selectedUsers: [], foundUsers: [],selectedDMs: [], foundDMs: [], disableDropdown: false}
        this.getExclusionList = this.getExclusionList.bind(this)
        this.hasDMWith = this.hasDMWith.bind(this)
    }
    filteredUsers(){
        const filteredUsers = Object.values(this.props.users).filter(user => !this.hasDMWith(user))    
        // if(selectedUsers){
        //     return filteredUsers.filter(user => !selectedUsers.includes(user.id))
        // }
        return filteredUsers
    }
    getExclusionList() {
        return this.props.exclusionList || []
    }
    setBothStates(state){
        this.props.setParentState(state);
        this.setState(state);
    }
    componentDidMount(){
        const foundDMs = Object.values(this.props.dms).filter(dm => !(dm.user_ids.length === 1 && dm.user_ids[0] === this.props.currentUserId))
        this.setState({ foundUsers: this.filteredUsers(), foundDMs: foundDMs})
    }
    removeSelectedUser(id) {
        return () => {
            let newDMs = this.state.selectedDMs
            if(!this.props.dmExists(this.state.selectedUsers)){
               newDMs = []; 
            }
            this.setBothStates(
                {
                    selectedUsers: this.state.selectedUsers.filter(checkId => {
                        return id !== checkId
                    }),
                    selectedDMs: newDMs
                })
        }
    }
    selectUser(id) {
        return (e) => {
            e.preventDefault();
            if(id === this.props.currentUserId){
                const dm = Object.values(this.props.dms).find(dm=> dm.user_ids.length === 1 && dm.user_ids[0] === this.props.currentUserId)
                this.props.showDM(dm.id)
                this.props.changeChannelView(dm.id, "DirectMessage")();
                this.props.closeOverlay();
                return
            }
            if(!this.state.selectedUsers.some(selId=> selId === id)){
                this.setBothStates({ selectedUsers: this.state.selectedUsers.concat(id), searchUser: "", foundUsers: this.filteredUsers(), })
                document.getElementsByClassName("search-members-input")[0].focus();
            }
        }
    }
    selectDM(dm) {
        return (e) => {
            e.preventDefault();
            if (!this.state.selectedDMs.some(selId=> selId === dm.id)){
                const selectedUsers = _.union(this.state.selectedUsers, dm.user_ids.filter(id => id !== this.props.currentUserId));
                this.setBothStates(
                    { 
                        selectedDMs: this.state.selectedDMs.concat(dm.id), 
                        searchUser: "", 
                        selectedUsers: selectedUsers,
                        foundUsers: this.filteredUsers(),
                    }
                )
                document.getElementsByClassName("search-members-input")[0].focus();
            }
        }
    }
    keyUp(e) {
        if (e.keyCode === 8 && !this.state.searchUser) { //backspace pressed
            // debugger
            this.removeSelectedUser(this.state.selectedUsers.slice().pop())()
            // this.setBothStates({ selectedUsers: this.state.selectedUsers.slice(0, this.state.selectedUsers.length - 1) });
        }
    }
    onClick(e) {
        document.getElementsByClassName("search-members-input")[0].focus();
    }
    
    hasDMWith(user){
        if (user.id === this.props.currentUserId) return false;
        const retval =  Object.values(this.props.dms).some(dm => (dm.user_ids.length === 2 && dm.user_ids.includes(user.id)))
        // debugger
        // //console.log(retval)
        return retval
    }
    handleSearchBarInput(e) {
        this.handleInput("searchUser")(e);
        const searchText = e.target.value
        let foundDMs = [];
        let foundUsers = [];
        Object.values(this.props.dms).filter(dm => !this.state.selectedDMs.includes(dm.id) && !(dm.user_ids.length === 1 && dm.user_ids[0] === this.props.currentUserId)).forEach(dm => {
            
            const memberNames = dm.user_ids.map(id => this.props.users[id].full_name)
            const query = searchText.toLowerCase();
            if (memberNames.some(name => name.startsWith(query)) || dm.title.toLowerCase().startsWith(query)) {
                foundDMs.push(dm)
            }
        })
        //looks at all users that we don't have a DM with
        this.filteredUsers().forEach(user => {
            const filteredUsername = user.username.toLowerCase().replace(/[^0-9a-z]/g, '');
            // //console.log(user.username)

            if (filteredUsername.startsWith(searchText.toLowerCase()) || user.full_name.startsWith(searchText)) {
                // debugger
                foundUsers.push(user)
            }
        })
        foundUsers = foundUsers.filter(user => !this.state.selectedUsers.includes(user.id))
        this.setBothStates({ foundUsers: foundUsers, foundDMs: foundDMs})
        
    }

    handleInput(type){
        return (e) => {
           // //console.log(e.target.value)
            this.setBothStates({ [type]: e.target.value })
            this.props.handleInput(type)(e);
        }
    }
    
    render(){
        const foundUserButtons = this.state.foundUsers.map((user) => {
            if(this.state.selectedUsers.includes(user.id)) return null
            
            return (
                <button onClick={this.selectUser(user.id)} key={`found-user-${user.id}`} className="found_user_item">
                    <div className="content">
                    <svg className="user-small svg-icon-darker" viewBox="0 0 20 15">
                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                    </svg>
                    <div className="user-name">{user.full_name}</div>

                    </div>
                    <span className="enter-icon">enter<i className="fa fa-level-down-alt" /></span>
                </button>
            )
        })
        const foundDMButtons = this.state.foundDMs.map((dm) => {
            if(this.state.selectedDMs.includes(dm.id)){
                // //console.log("huh?")
                return undefined
            }
            // //console.log(dm.title);
            return (
                <button onClick={this.selectDM(dm)} key={`found-dm-${dm.id}`} className="found_dm_item">
                    <div className="content">
                    <svg className="user-small svg-icon-darker" viewBox="0 0 20 15">
                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                    </svg>
                    <span className="dm-title">{dm.title}</span>
                    </div>
                    <span className="dm-timestamp">{new Date(dm.created_at).toLocaleString('en-us', { month: "long", day: "numeric", year: "numeric" })}</span>
                    <span className="enter-icon">enter<i className="fa fa-level-down-alt"/></span>
                </button>
            )
        })
        const selectedUserSpans = this.state.selectedUsers.map( id =>{
            return <span key={`selected-user-${id}`} className="selected-user-span">
                <svg className="user svg-icon" viewBox="0 0 20 15">
                    <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                </svg>
                {this.props.users[id].username}
                <button className="remove-selected-user" onClick={this.removeSelectedUser(id)}><svg className="button-close svg-icon-darker" viewBox="0 0 20 20">
							<path fill="none" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
							c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
							c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
							c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
						</svg></button> 
            </span>
        })
        const placeholder = this.state.selectedUsers && this.state.selectedUsers.length ? "" : "Search for users"
        // const dropdownDisabled = foundUserButtons && foundUserButtons.length ? "" : "hide";
        return (
            <div className="users-search-field">
                <div id="channel-members-container" onClick={this.onClick} className=" dm-members-container loose-text-input overlay-text-input">
                    {selectedUserSpans}
                    <input className={`search-members-input`} type="text" onKeyDown={this.keyUp} onChange={this.handleSearchBarInput} placeholder={placeholder} value={this.state.searchUser} />
                </div>
                <span className="subtitle">Existing Conversations</span>
                <div className="dm-search-results">
                    <div className="scrollable">
                        {foundDMButtons}
                        {foundUserButtons}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    users: state.entities.users,
    currentUserId: state.session.id,
    dms: state.entities.dms
})
export default connect(mapStateToProps)(SearchDMsField)