import React from 'react'

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password_check: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.processForm(this.state)
            //.then(() => this.setState({ username: "", password: "", password_check: "" }))
            .fail((e) => this.setState({ password: "", password_check: "" }))
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }

    render() {
        const lastInput = this.props.formType === 'signup' ? (
            <>
                <label> Confirm Password
                    <input type="password" onChange={this.handleInput('password_check')} value={this.state.password_check} />
                </label>
                <input type="submit" value="Sign up"/>
            </>
        ):(
            <input type="submit" value="Sign in"/>
        )
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>{this.props.formType === 'signup' ? "Sign up" : "Log in"}</h2>
                <label> Username
                    <input type="text" onChange={this.handleInput('username')} value={this.state.username} />
                </label>
                <label> Password
                    <input type="password" onChange={this.handleInput('password')} value={this.state.password} />
                </label>
                {lastInput}
            </form>
        )
    }
}