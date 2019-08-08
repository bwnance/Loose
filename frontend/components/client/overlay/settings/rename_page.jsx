import React from 'react'

export default class RenamePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {inputValue: this.props.currentChannel.title}
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    onChange(e){
        this.setState({inputValue: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.renameChannel(this.state.inputValue)
        this.props.closeOverlay();
    }
    render(){
        return (
            <div className="rename-page">
                <form className="rename-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="rename-input-id">Name</label>
                    <input onChange={this.onChange} type="text" id="rename-input-id" placeholder={`Rename ${this.props.currentChannel.title}`} value={this.state.inputValue} className="rename-input loose-text-input overlay-text-input"/>
                    <div className="subtitle">Names should be lowercase, without spaces or periods.</div>
                    <div className="bottom-row">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button className="submit-btn" onClick={this.onSubmit}>Rename Channel</button>
                    </div>
                </form>
            </div>
        )
    }
}
