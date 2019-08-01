import React from 'react'
import {connect} from 'react-redux'
import {clearErrors} from '../../../actions/errors_actions'
import {checkEmail} from '../../../actions/ui_actions'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
class EmailForm extends React.Component {
    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.pageClick = this.pageClick.bind(this)
        this.state = {email: this.props.email, showErrors: false}
    }
    componentDidMount(){
        window.addEventListener("mousedown", this.pageClick, false);
    }
    pageClick(){
        this.setState({showErrors: false})
    }
    handleSubmit(e){ 
        this.setState({showErrors: true})
        e.preventDefault()
        //redirect to login or signup, depending on state
        this.props.checkEmail(this.state.email)
            .then((result)=> {         
                if (result.data.exists){
                    this.props.history.push('/login')
                }
                else{
                    this.props.history.push('/signup')

                }
            })
        window.addEventListener("mousedown", this.pageClick, false);

    }
    handleChange(e){
        this.setState({email: e.target.value})
    }
    componentWillUnmount() {
        this.props.clearErrors()
        window.removeEventListener("mousedown", this.pageClick, false);
    }
    render(){
        const errors = this.props.errors.map((error)=>{ 
            return (
                <li>{error}</li>
            )
        })
        return (<>
            <ul className={`splash-errors ${this.state.showErrors ? '' : 'hide'}`}>
                {errors}
            </ul>
            <form onSubmit={this.handleSubmit} className="splash-email-form">
                <input className="splash-form-text" type="text" placeholder="Your work email" onChange={this.handleChange}/>
                <input className="splash-form-submit"  type="submit" value="Try For Free"/>
            
            <div className="email-form-login" >
                <span>Already Using Loose?  </span><Link to="/login">Log in</Link>.
            </div>
            </form>
            </>
        )
    }
    
}

const mapStateToProps = (state) => ({
    errors: Object.values(state.errors.ui),
    email: state.ui.emailForm.email
})

const mapDispatchToProps = (dispatch) => ({
    clearErrors: () => dispatch(clearErrors()),
    checkEmail: (email) => dispatch(checkEmail(email))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailForm))