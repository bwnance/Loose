import { connect } from 'react-redux'
import {clearErrors} from '../../actions/errors_actions'
import { login } from '../../actions/session'
import SessionForm from './session_form'
const mapStateToProps = (state) => ({
    errors: state.errors.session,
    formType: 'login',
    formUser: {
        full_name: "",
        email: state.ui.emailForm.email || "",
        password: "",
        password_check: ""
    }
})
const mapDispatchToProps = (dispatch) => ({
    processForm: (formUser) => dispatch(login(formUser)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)