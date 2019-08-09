import React from 'react'

export default class PurposePage extends React.Component {
    constructor(props){
        super(props)
        this.state = { inputValue: this.props.currentChannel.title }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ inputValue: e.target.value })
        // this.resizeTextArea();
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.setPurpose(this.state.inputValue)
        this.props.closeOverlay();
    }
    resizeTextArea() {
        const textArea = document.getElementById("purpose-input-id")
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
            <div className="purpose-page" >
                <form className="purpose-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="purpose-input-id">Purpose (optional)</label>
                    <div className="purpose-input-container">
                        <textarea onChange={this.onChange} type="text" id="purpose-input-id" value={this.state.inputValue} className="purpose-input loose-text-input overlay-text-input" />
                    </div>
                    <div className="subtitle">Describe what this channel is for.</div>
                    <div className="bottom-row">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button className="submit-btn" onClick={this.onSubmit}>Update Purpose</button>
                    </div>
                </form>
            </div >
        )
    }
}
