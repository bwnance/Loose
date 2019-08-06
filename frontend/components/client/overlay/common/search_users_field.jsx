import React from 'react'
import {connect} from 'react-redux'
class SearchUsersField extends React.Component {
    constructor(props) {
        super(props)
        this.keyUp = this.keyUp.bind(this);
        this.handleSearchBarInput = this.handleSearchBarInput.bind(this)
        this.selectUser = this.selectUser.bind(this)
        this.onClick = this.onClick.bind(this);
        this.state = { searchUser: "", selectedUsers: [], foundUsers: []}
        this.handleInput = this.handleInput.bind(this)
    }
    setBothStates(state){
        this.props.setParentState(state);
        this.setState(state);
    }
    removeSelectedUser(id) {
        return () => {
            this.setBothStates(
                {
                    selectedUsers: this.state.selectedUsers.filter(checkId => {
                        return id !== checkId
                    })
                })
        }
    }
    selectUser(id) {
        return () => {
            document.getElementsByClassName("search-members-input")[0].focus();
            this.setBothStates({ selectedUsers: this.state.selectedUsers.concat(id), searchUser: "", foundUsers: [], })
        }
    }
    keyUp(e) {
        if (e.keyCode === 8 && !this.state.searchUser) { //backspace pressed
            this.setBothStates({ selectedUsers: this.state.selectedUsers.slice(0, this.state.selectedUsers.length - 1) });
        }
    }
    onClick(e) {
        console.log("click")
        document.getElementsByClassName("search-members-input")[0].focus();
    }
    handleSearchBarInput(e) {
        this.handleInput("searchUser")(e);
        const searchText = e.target.value
        let foundUsers = [];
        Object.values(this.props.users).forEach(user => {
            if (searchText !== "" && user.id !== this.props.currentUserId && user.username.startsWith(searchText)) {
                foundUsers.push(user)
            }
        })
        console.log(foundUsers)
        this.setBothStates({ foundUsers: foundUsers })
        
    }
    handleInput(type){
        return (e) => {
           // console.log(e.target.value)
            this.setBothStates({ [type]: e.target.value })
            this.props.handleInput(type)(e);
        }
    }
   
    render(){
        const foundUserButtons = this.state.foundUsers.map((user) => {
            return (
                <button onClick={this.selectUser(user.id)} key={`found-user-${user.id}`} className="found_user_item">
                    {this.state.selectedUsers.includes(user.id) ? <i className="user-already-selected fa fa-check" /> : <span className="check-placeholder" />}
                    <svg className="user-small svg-icon-darker" viewBox="0 0 20 15">
                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                    </svg>
                    {user.username}
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
        const disableDropdown = foundUserButtons && foundUserButtons.length ? "" : "hide";
        console.log(disableDropdown)
        return (
            <div className="users-search-field">
                <div id="channel-members-container" onClick={this.onClick} className="loose-text-input overlay-text-input">
                    {selectedUserSpans}
                    <input className="search-members-input" type="text" onKeyDown={this.keyUp} onChange={this.handleSearchBarInput} placeholder={placeholder} value={this.state.searchUser} />
                </div>
                <div className={`foundUsers-dropdown ${disableDropdown}`}>
                    {foundUserButtons}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    users: state.entities.users,
    currentUserId: state.session.id
})
export default connect(mapStateToProps)(SearchUsersField)