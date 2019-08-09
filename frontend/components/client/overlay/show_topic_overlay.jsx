import React from 'react'
import {connect} from 'react-redux'

class ShowTopicOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {topicText: this.props.currentChannel.topic ? this.props.currentChannel.topic : ""}
        this.onChange = this.onChange.bind(this)
        this.setTopic = this.setTopic.bind(this)
    }
    componentDidMount(){
        document.getElementById("topic-textarea").focus();
    }
    setTopic(e){
        e.preventDefault()
        this.props.updateChannel({topic: this.state.topicText}, this.props.currentChannelId)
        //console.log(this.props.currentChannelId)
        this.setState({topicText: ""})
        this.props.closeOverlay();
    }
    onChange(e){
        this.setState({topicText: e.target.value})
        this.resizeTextArea();
    }
    resizeTextArea() {
        const textArea = document.getElementById("topic-textarea")

        const textAreaStyle = getComputedStyle(textArea);

        textArea.style.height = '0px';
        let height = parseFloat(textAreaStyle.getPropertyValue('border-top-width'))
            + parseFloat(textAreaStyle.getPropertyValue('padding-top'))
            + textArea.scrollHeight
            + parseFloat(textAreaStyle.getPropertyValue('padding-bottom'))
            + parseFloat(textAreaStyle.getPropertyValue('border-bottom-width'));


        //console.log(height);
        if (height > 480) height = 480;
        textArea.style.height = height + "px";
    }
    render(){
        return (
            <div className="client-overlay transparent-overlay">
                <form onSubmit={this.setTopic} className="topic-form">
                    <div className="top-row">
                    <h2>
                        Edit channel topic
                    </h2>
                        <button type="button" className="close-overlay-btn" onClick={this.props.closeOverlay}>
                        <svg className="button-close svg-icon-darker" viewBox="0 0 20 20">
							<path fill="none" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
							c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
							c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
							c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
						</svg>
                        </button>
                    </div>
                    <textarea id="topic-textarea" onChange={this.onChange} className="loose-text-input overlay-text-input topic-input" value={this.state.topicText}>value={this.state.topicText}</textarea>
                    <div className="buttons">
                        <button onClick={this.props.closeOverlay} className="session-submit cancel-btn " type="button">Cancel</button>
                        <input type="submit" className="submit-btn session-submit" value="Set topic"/>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentChannelId: state.ui.chatWindow.id,
    currentChannel: state.entities.channels[state.ui.chatWindow.id]
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ShowTopicOverlay);