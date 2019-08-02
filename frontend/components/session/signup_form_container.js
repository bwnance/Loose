import { connect } from 'react-redux'
import { signup } from '../../actions/session'
import SessionForm from './session_form'
import { clearErrors } from '../../actions/errors_actions'
const mapStateToProps = (state) => ({
    errors: state.errors.session,
    formType: 'signup',
    formUser: {
        full_name: "",
        email: state.ui.emailForm.email || "",
        password: "",
        password_check: ""
    }
})
const mapDispatchToProps = (dispatch) => ({
    processForm: (formUser) => dispatch(signup(formUser)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)