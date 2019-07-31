import React from 'react'
import {connect} from 'react-redux'
import {clearErrors} from '../../../actions/errors_actions'
import {checkEmail} from '../../../actions/ui_actions'
import {withRouter} from 'react-router-dom'
class EmailForm extends React.Component {
    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {email: this.props.email}
        
    }
    handleSubmit(e){ 
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
    }
    handleChange(e){
        this.setState({email: e.target.value})
    }
    componentWillUnmount() {
       this.props.clearErrors()
    }
    render(){
        const errors = this.props.errors.map((error)=>{ 
            return (
                <li>{error}</li>
            )
        })
        return (<>
            <ul>
                {errors}
            </ul>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your work email" onChange={this.handleChange}/>
                <input type="submit" value="Try For Free"/>
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