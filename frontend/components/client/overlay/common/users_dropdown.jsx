import React from 'react'
export default class UsersDropdown extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        window.addEventListener("mousedown", this.handleClick)
    }
    handleClick(e){
        if(!this.isDescendant(e.target)){
            this.props.disableDropdown();
        }
    }
    componentWillUnmount(){
        window.removeEventListener("mousedown", this.handleClick)
    }
    isDescendant(child){
        //is there a better way to accomplish this?
        parent = document.getElementsByClassName("foundUsers-dropdown")[0]
        let node = child.parentNode;
        while(node != null){
            if(node == parent) return true
            node = node.parentNode
        }
        return false
    }
    render(){
        return (
            <div className={`foundUsers-dropdown`}>
                {this.props.foundUserButtons}
            </div>
        )
    }
}