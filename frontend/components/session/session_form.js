import React from 'react'

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
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
        const errors = []
        
        this.props.errors.forEach((error)=>{
            errors.push(<li className="error-item">{error}</li>)
        })
        const formBody =  this.props.formType === 'signup' ? (
            <>
                <h2>Sign Up</h2>
                <label> Username
                    <input type="text" onChange={this.handleInput('username')} value={this.state.username} />
                </label>
                <label> Email
                    <input type="text" onChange={this.handleInput('email')} value={this.state.email} />
                </label>
                <label> Password
                    <input type="password" onChange={this.handleInput('password')} value={this.state.password} />
                </label>
                <label> Confirm Password
                    <input type="password" onChange={this.handleInput('password_check')} value={this.state.password_check} />
                </label>
                <input type="submit" value="Sign up"/>
            </>
        ) : (
            <>
                <h2>Sign In</h2>
                <label> Email
                    <input type="text" onChange={this.handleInput('email')} value={this.state.email} />
                </label>
                <label> Password
                    <input type="password" onChange={this.handleInput('password')} value={this.state.password} />
                </label>
                <input type="submit" value="Sign In" />
            </>
        )

            return (
                <>
                <ul>{errors}</ul>
                <form onSubmit = {this.handleSubmit} >
                {formBody}
                </form>
                </>
            )
    }
}