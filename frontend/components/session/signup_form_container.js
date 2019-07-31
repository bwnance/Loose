import { connect } from 'react-redux'
import { signup } from '../../actions/session'
import SessionForm from './session_form'
import { clearErrors } from '../../actions/errors_actions'
const mapStateToProps = (state) => ({
    errors: Object.values(state.errors.session),
    formType: 'signup',
    formUser: {
        username: "",
        email: state.session.email,
        password: "",
        password_check: ""
    }
})
const mapDispatchToProps = (dispatch) => ({
    processForm: (formUser) => dispatch(signup(formUser)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)