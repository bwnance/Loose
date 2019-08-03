import React from 'react'

class ChatForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {body: ""}
        this.handleBodyUpdate = this.handleBodyUpdate.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
        this.messageSubmit = this.messageSubmit.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.form = null;
    }
    onEnterPress(e) {
        if(e.keyCode === 13 ){
            if( e.shiftKey === false) {
            e.preventDefault()
                this.props.onSubmit()
                this.messageSubmit();
            }
            else{
                
            }
        }
    }
    onKeyUp(){
        const textArea = document.getElementById("message-window-textarea")
        const form = document.getElementById("message-window-form")
        const messageList = document.getElementsByClassName("window-message-list")[0]
        if (form){

            //get computedStyles for the form, textArea, and messageList
            const formStyle = getComputedStyle(form)
            const textAreaStyle = getComputedStyle(textArea);
            const messagesStyle = getComputedStyle(messageList)

            //set starting height of the three elements
            const textAreaStartingHeight = parseFloat(textAreaStyle.getPropertyValue('height'))
            const formStartingHeight = parseFloat(formStyle.getPropertyValue('height'))
            const messagesInitialHeight = parseFloat(messagesStyle.getPropertyValue('height'));

            //resizes text area//
            textArea.style.height = '0px';
            let height = parseFloat(textAreaStyle.getPropertyValue('border-top-width'))
                + parseFloat(textAreaStyle.getPropertyValue('padding-top'))
                + textArea.scrollHeight
                + parseFloat(textAreaStyle.getPropertyValue('padding-bottom'))
                + parseFloat(textAreaStyle.getPropertyValue('border-bottom-width'));

           

            if(height > 500) height = 500;
            textArea.style.height = height + "px";

            console.log(textArea.scrollHeight)

            const newHeight = height
            
            const heightDifference = newHeight - textAreaStartingHeight ;
            const newFormHeight = formStartingHeight + heightDifference;
            const newMessagesHeight = messagesInitialHeight - heightDifference
            console.log(newFormHeight - formStartingHeight)
            form.style.height = newFormHeight + "px"
            messageList.style.height = newMessagesHeight + "px";
            
            
        }
        
        
    }
    componentDidMount(){
        const that = this;
        document.addEventListener('input', function (event) {
            if (event.target.tagName.toLowerCase() !== 'textarea') return;
            that.onKeyUp();
        }, false);
    }
    messageSubmit(){
        console.log("submitting")
        const body = this.state.body
        this.props.onSubmit(body)
        this.setState({ body: "" })
        setTimeout(this.onKeyUp)

    }
    handleBodyUpdate(e) {
        this.setState({ body: e.target.value })
    }
    render(){

        return (
            <form id="message-window-form" className="message-form">
                <textarea rows="1" cols="80" id="message-window-textarea" onKeyDown={this.onEnterPress} value={this.state.body} onChange={this.handleBodyUpdate} type="text" className="message-input" placeholder="Message channel" />
            </form>
        )

    }

}
export default ChatForm