import React from 'react'
export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.formUser
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.demoLogin = this.demoLogin.bind(this)
        this.emailError = false;
        this.passwordError = false;
        this.typingDemoUser = false;
    }
    componentDidMount() {
        document.body.classList.toggle('grey-bg');
    }
    handleSubmit(e) {
        e.preventDefault()
        if (this.typingDemoUser) return
        this.emailError = !this.state.email
        this.passwordError = !this.state.password
        this.props.processForm(this.state)
            //.then(() => this.setState({ username: "", password: "", password_check: "" }))
            .fail((e) => this.setState({ password: "", password_check: "" }))
    }
    componentWillUnmount() {
        this.props.clearErrors()
        document.body.classList.toggle('grey-bg');

    }
    demoLogin(){
        if (this.typingDemoUser) return
        const demoEmail = "demouser@loose.org"
        const demoPassword = "demodemo"
        
        this.typingDemoUser = true;
        let i = 0;
        const that = this;
        this.setState({ email: "", password: ""}, () => loginLoop())
        function loginLoop(){
            if (i < demoEmail.length) {
                const char = demoEmail[i]
                i++
                return that.setState({ email: that.state.email + char }, () => setTimeout(loginLoop, 30))
            }
            else{
                passwordLoop();
            }
        }
        
        let j = 0;
        function passwordLoop() {
            if (j < demoPassword.length) {
                const char = demoPassword[j]
                j++
                that.setState({ password: that.state.password + char }, () => setTimeout(passwordLoop, 30))
            }
            else
            {
                that.typingDemoUser = false;
                that.handleSubmit({preventDefault: () => null });
            }
        }
    } 
    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }

    render() {
        const login_error = <div className={`login-error ${this.props.errors.login ? "" : "transparent"}`}><i className="error-ico"/>{this.props.errors.login}</div>
        const hasFNErrors = !!this.props.errors.full_name
        const hasEmailErrors = !!this.props.errors.email
        const hasPasswordErrors = !!this.props.errors.password
        const hasPasswordsErrors = !!this.props.errors.passwords
        const anyErrors = hasFNErrors || hasEmailErrors || hasPasswordErrors;


        const formBody =  this.props.formType === 'signup' ? (
            <>
                <h2 className="session-form-header">Join Loose!</h2>
                <label htmlFor="full-name"/>
                <input id="full-name" className={`loose-text-input ${anyErrors ? "warn-field-border" : ""} ${hasFNErrors ? "warn-field" : ""}`} type="text" onChange={this.handleInput('full_name')} value={this.state.full_name} placeholder="Full Name"/>
                    <div className="session-form-error">{hasFNErrors && "Full Name " + this.props.errors.full_name[0]}</div>
                <label htmlFor="email" />
                    <input id="email" className={`loose-text-input ${anyErrors ? "warn-field-border" : ""} ${hasEmailErrors ? "warn-field" : ""}`} type="text" onChange={this.handleInput('email')} value={this.state.email} placeholder="Email"/>
                    <div className="session-form-error">{hasEmailErrors && "Email " + this.props.errors.email[0]}</div>
                <label htmlFor="password" />
                    <input id="password" className={`loose-text-input ${anyErrors ? "warn-field-border" : ""} ${hasPasswordErrors ? "warn-field" : ""}`} type="password" onChange={this.handleInput('password')} value={this.state.password} placeholder="Password"/>
                    <div className="session-form-error">{hasPasswordErrors && "Password " + this.props.errors.password[0]}</div>
                <label htmlFor="confirm-password"/>
                    <input id="confirm-password" className={`loose-text-input ${anyErrors ? "warn-field-border" : ""} ${hasPasswordsErrors ? "warn-field" : ""}`}  type="password" onChange={this.handleInput('password_check')} value={this.state.password_check} placeholder="Verify Password"/>
                    <div className="session-form-error">{hasPasswordsErrors && "Passwords " + this.props.errors.passwords[0]}</div>
                <input className="session-submit" type="submit" value="Sign up"/>
            </>
        ) : (
            <>
                <h2 className="session-form-header">Sign In</h2>

                <label htmlFor="email"/>
                    <input id="email" disabled={this.typingDemoUser} className={`typewriter loose-text-input ${this.emailError ? "error-field" : ""}`} type="text" onChange={this.handleInput('email')} value={this.state.email} placeholder="Email"/>
                    <div className="session-form-error" />
                <label htmlFor="password" />
                    <input id="password" disabled={this.typingDemoUser} className={`loose-text-input ${this.passwordError ? "error-field" : ""}`} type="password" onChange={this.handleInput('password')} value={this.state.password} placeholder="Password"/>
                    <div className="session-form-error" />
                    <input disabled={this.typingDemoUser} className="session-submit" type="submit" value="Sign In" />
                    <input disabled={this.typingDemoUser} onClick={this.demoLogin}className="session-submit" type="button" value="Demo Login" />
            </>
        )
            return (
                <>
                <div className="session-form-container">
                    {login_error}
                    <form className="loose-form" onSubmit = {this.handleSubmit} >
                    {formBody}
                    </form>
                </div>
                </>
            )
    }
}