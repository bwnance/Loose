import React from 'react'
import {connect} from 'react-redux'
import {createChannel} from '../../../actions/channel_actions'
class CreateChannelOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: "", purpose: ""}
        this.onSubmit = this.onSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    onSubmit(e) {
        e.preventDefault()
        this.props.closeOverlay()
        this.props.createChannel(this.state)
        this.setState({ title: "", purpose: ""})
        
    }
    handleInput(type){
        return (e) => {
            console.log(e.target.value)
            this.setState({ [type]: e.target.value })
        }
    }
    render() {
        return (
            <div className={this.props.className}>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="channel-name">Name</label>
                    <input id="channel-name" type="text" value={this.state.title} onChange={this.handleInput('title')}/>
                    <label htmlFor="channel-purpose">Channel Purpose <span>(optional)</span></label>
                    <input id="channel-purpose" type="text" value={this.state.purpose} onChange={this.handleInput('purpose')}/>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({
    createChannel: (channel) => dispatch(createChannel(channel))
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelOverlay);